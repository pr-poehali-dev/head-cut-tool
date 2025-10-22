import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { removeBackground } from '@imgly/background-removal';

export const EditorSection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<'transparent' | 'white' | 'black'>('transparent');
  const [finalImage, setFinalImage] = useState<string | null>(null);

  const bodyTemplates = [
    { id: 'businessman', name: 'Бизнесмен', image: 'https://cdn.poehali.dev/projects/1a5b0d4c-aa26-43cf-b85e-eb66fed627a1/files/ca98fa07-774f-4726-b0f8-4be77e9be5dc.jpg' },
    { id: 'astronaut', name: 'Космонавт', image: 'https://cdn.poehali.dev/projects/1a5b0d4c-aa26-43cf-b85e-eb66fed627a1/files/6d543175-707b-404d-9a7e-05fed2077a4b.jpg' },
    { id: 'superhero', name: 'Супергерой', image: 'https://cdn.poehali.dev/projects/1a5b0d4c-aa26-43cf-b85e-eb66fed627a1/files/f0a72cd4-76be-4560-89cf-d70a142700ab.jpg' },
    { id: 'doctor', name: 'Врач', image: 'https://cdn.poehali.dev/projects/1a5b0d4c-aa26-43cf-b85e-eb66fed627a1/files/42831fc8-2e0e-4f09-85c2-309956ba5a4f.jpg' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const processImage = async () => {
    if (!selectedImage) return;
    
    setIsProcessing(true);
    
    try {
      const blob = await removeBackground(selectedImage);
      const url = URL.createObjectURL(blob);
      setProcessedImage(url);
      setFinalImage(null);
    } catch (error) {
      alert('Ошибка обработки изображения');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const mergeHeadWithTemplate = () => {
    if (!processedImage || !selectedTemplate) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 1200;

    const bgColor = backgroundColor === 'white' ? '#FFFFFF' : backgroundColor === 'black' ? '#000000' : 'transparent';
    if (backgroundColor !== 'transparent') {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const templateImg = new Image();
    templateImg.crossOrigin = 'anonymous';
    templateImg.onload = () => {
      ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);

      const headImg = new Image();
      headImg.crossOrigin = 'anonymous';
      headImg.onload = () => {
        const headWidth = 280;
        const headHeight = 280;
        const headX = (canvas.width - headWidth) / 2;
        const headY = 20;
        
        ctx.drawImage(headImg, headX, headY, headWidth, headHeight);
        setFinalImage(canvas.toDataURL('image/png'));
      };
      headImg.src = processedImage;
    };
    templateImg.src = selectedTemplate;
  };

  const downloadImage = () => {
    const imageToDownload = finalImage || processedImage;
    if (imageToDownload) {
      const link = document.createElement('a');
      link.href = imageToDownload;
      link.download = finalImage ? 'tantamaresca-result.png' : 'cutout-head.png';
      link.click();
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Редактор фото</h2>
        <p className="text-gray-600">Загрузите фото и AI автоматически вырежет голову</p>
      </div>

      {processedImage && (
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Шаг 2: Выберите образ</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {bodyTemplates.map((template) => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template.image)}
                className={`cursor-pointer rounded-lg overflow-hidden border-4 transition-all ${
                  selectedTemplate === template.image ? 'border-primary shadow-lg' : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img src={template.image} alt={template.name} className="w-full h-48 object-cover" />
                <p className="text-center text-sm font-medium py-2">{template.name}</p>
              </div>
            ))}
          </div>
          
          <h3 className="text-lg font-semibold mb-4">Шаг 3: Выберите фон</h3>
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setBackgroundColor('transparent')}
              className={`px-4 py-2 rounded-lg border-2 ${
                backgroundColor === 'transparent' ? 'border-primary bg-primary/10' : 'border-gray-300'
              }`}
            >
              Прозрачный
            </button>
            <button
              onClick={() => setBackgroundColor('white')}
              className={`px-4 py-2 rounded-lg border-2 ${
                backgroundColor === 'white' ? 'border-primary bg-primary/10' : 'border-gray-300'
              }`}
            >
              Белый
            </button>
            <button
              onClick={() => setBackgroundColor('black')}
              className={`px-4 py-2 rounded-lg border-2 ${
                backgroundColor === 'black' ? 'border-primary bg-primary/10' : 'border-gray-300'
              }`}
            >
              Черный
            </button>
          </div>

          {selectedTemplate && (
            <Button onClick={mergeHeadWithTemplate} className="w-full" size="lg">
              <Icon name="Wand2" size={20} className="mr-2" />
              Создать образ
            </Button>
          )}
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Шаг 1: Исходное фото</h3>
          {!selectedImage ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer"
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Icon name="Upload" size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">Перетащите фото сюда или нажмите для выбора</p>
                <p className="text-sm text-gray-400">PNG, JPG до 10MB</p>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <img src={selectedImage} alt="Selected" className="w-full rounded-lg" />
              <Button variant="outline" onClick={() => setSelectedImage(null)} className="w-full">
                <Icon name="X" size={16} className="mr-2" />
                Выбрать другое фото
              </Button>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">{finalImage ? 'Готовый образ' : 'Результат'}</h3>
          {!processedImage && !selectedImage && (
            <div className="border-2 border-gray-200 rounded-lg p-12 text-center bg-gray-50">
              <Icon name="Image" size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-400">Загрузите фото для обработки</p>
            </div>
          )}
          {selectedImage && !processedImage && (
            <div className="border-2 border-gray-200 rounded-lg p-12 text-center">
              <Button onClick={processImage} disabled={isProcessing} size="lg">
                {isProcessing ? (
                  <>
                    <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                    Обработка...
                  </>
                ) : (
                  <>
                    <Icon name="Scissors" size={20} className="mr-2" />
                    Вырезать голову
                  </>
                )}
              </Button>
            </div>
          )}
          {(finalImage || processedImage) && (
            <div className="space-y-4">
              <div className="relative bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjBmMGYwIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmMGYwZjAiLz48L3N2Zz4=')] rounded-lg p-4">
                <img src={finalImage || processedImage} alt="Result" className="w-full rounded-lg" />
              </div>
              {!finalImage && processedImage && (
                <p className="text-sm text-gray-500 text-center">⬆️ Выберите образ выше, чтобы создать тантамареску</p>
              )}
              <div className="flex gap-2">
                <Button onClick={downloadImage} className="flex-1">
                  <Icon name="Download" size={16} className="mr-2" />
                  Скачать PNG
                </Button>
                <Button variant="outline" onClick={() => { setProcessedImage(null); setFinalImage(null); }}>
                  <Icon name="RotateCcw" size={16} className="mr-2" />
                  Заново
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};