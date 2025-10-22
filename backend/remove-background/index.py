import json
import base64
import os
from typing import Dict, Any
import urllib.request

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Remove background from images using WithoutBG API
    Args: event - dict with httpMethod, body (base64 image)
          context - object with request_id, function_name attributes
    Returns: HTTP response with processed image
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    api_key = os.environ.get('WITHOUTBG_API_KEY', '')
    
    if not api_key:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'API key not configured. Please add WITHOUTBG_API_KEY secret.'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    image_data = body_data.get('image', '')
    
    if not image_data:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'No image provided'})
        }
    
    if ',' in image_data:
        image_data = image_data.split(',')[1]
    
    image_bytes = base64.b64decode(image_data)
    
    boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'
    body_parts = []
    body_parts.append(f'--{boundary}'.encode())
    body_parts.append(b'Content-Disposition: form-data; name="file"; filename="image.jpg"')
    body_parts.append(b'Content-Type: image/jpeg')
    body_parts.append(b'')
    body_parts.append(image_bytes)
    body_parts.append(f'--{boundary}--'.encode())
    
    body = b'\r\n'.join(body_parts)
    
    req = urllib.request.Request(
        'https://api.withoutbg.com/v1/remove-background',
        data=body,
        headers={
            'Content-Type': f'multipart/form-data; boundary={boundary}',
            'X-API-Key': api_key
        }
    )
    
    response = urllib.request.urlopen(req, timeout=30)
    result_bytes = response.read()
    result_base64 = base64.b64encode(result_bytes).decode('utf-8')
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({
            'image': f'data:image/png;base64,{result_base64}',
            'request_id': context.request_id
        })
    }