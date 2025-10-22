import { Card } from '@/components/ui/card';

export const GallerySection = () => {
  const galleryImages = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400',
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Галерея результатов</h2>
        <p className="text-gray-600">Примеры работ, созданных с помощью нашего инструмента</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {galleryImages.map((image, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-64 object-cover" />
          </Card>
        ))}
      </div>
    </div>
  );
};
