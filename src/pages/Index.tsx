import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Icon name="Scissors" size={24} className="text-primary" />
              <h1 className="text-xl font-bold text-gray-900">Head Cutout Tool</h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => setActiveTab('home')}
                className={`px-3 py-2 text-sm font-medium ${
                  activeTab === 'home' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Главная
              </button>
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-3 py-2 text-sm font-medium ${
                  activeTab === 'editor' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Редактор
              </button>
              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-3 py-2 text-sm font-medium ${
                  activeTab === 'gallery' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Галерея
              </button>
              <button
                onClick={() => setActiveTab('tutorial')}
                className={`px-3 py-2 text-sm font-medium ${
                  activeTab === 'tutorial' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Инструкция
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`px-3 py-2 text-sm font-medium ${
                  activeTab === 'contacts' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Контакты
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'home' && <HomeSection onStartEditing={() => setActiveTab('editor')} />}
        {activeTab === 'editor' && <EditorSection />}
        {activeTab === 'gallery' && <GallerySection />}
        {activeTab === 'tutorial' && <TutorialSection />}
        {activeTab === 'contacts' && <ContactsSection />}
      </main>
    </div>
  );
};

const HomeSection = ({ onStartEditing }: { onStartEditing: () => void }) => {
  return (
    <div className="text-center space-y-12">
      <div className="space-y-6 animate-fade-in">
        <h2 className="text-5xl font-bold text-gray-900">Вырежьте голову из фото за секунды</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Профессиональный инструмент для автоматического распознавания и вырезания лиц с использованием AI
        </p>
        <Button onClick={onStartEditing} size="lg" className="text-lg px-8 py-6">
          <Icon name="Upload" size={20} className="mr-2" />
          Начать работу
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <Icon name="Zap" size={24} className="text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Быстро</h3>
          <p className="text-gray-600">Обработка фото занимает всего несколько секунд</p>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <Icon name="Sparkles" size={24} className="text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Точно</h3>
          <p className="text-gray-600">AI распознавание обеспечивает высокую точность вырезания</p>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <Icon name="Download" size={24} className="text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Просто</h3>
          <p className="text-gray-600">Загрузите фото и скачайте результат в PNG</p>
        </Card>
      </div>
    </div>
  );
};

const EditorSection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const processImage = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setProcessedImage(selectedImage);
      setIsProcessing(false);
    }, 2000);
  };

  const downloadImage = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = 'cutout-head.png';
      link.click();
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Редактор фото</h2>
        <p className="text-gray-600">Загрузите фото и AI автоматически вырежет голову</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Исходное фото</h3>
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
              <img src={selectedImage} alt="Original" className="w-full rounded-lg" />
              <Button variant="outline" onClick={() => setSelectedImage(null)} className="w-full">
                <Icon name="X" size={16} className="mr-2" />
                Удалить
              </Button>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Результат</h3>
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
          {processedImage && (
            <div className="space-y-4">
              <div className="relative bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjBmMGYwIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmMGYwZjAiLz48L3N2Zz4=')] rounded-lg p-4">
                <img src={processedImage} alt="Processed" className="w-full rounded-lg" />
              </div>
              <div className="flex gap-2">
                <Button onClick={downloadImage} className="flex-1">
                  <Icon name="Download" size={16} className="mr-2" />
                  Скачать PNG
                </Button>
                <Button variant="outline" onClick={() => setProcessedImage(null)}>
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

const GallerySection = () => {
  const galleryImages = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Галерея</h2>
        <p className="text-gray-600">Примеры обработанных фотографий</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {galleryImages.map((img, idx) => (
          <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="relative">
              <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <Button variant="secondary" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon name="Download" size={16} className="mr-2" />
                  Скачать
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const TutorialSection = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Инструкция</h2>
        <p className="text-gray-600">Как использовать инструмент</p>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Загрузите фото</h3>
              <p className="text-gray-600">
                Перейдите в раздел "Редактор" и загрузите фотографию человека. Поддерживаются форматы JPG и PNG.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Запустите обработку</h3>
              <p className="text-gray-600">
                Нажмите кнопку "Вырезать голову". AI автоматически распознает лицо и вырежет его из фона.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Скачайте результат</h3>
              <p className="text-gray-600">
                Получите изображение с прозрачным фоном в формате PNG. Готово к использованию!
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold mb-1">Советы для лучшего результата</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Используйте фото с хорошим освещением</li>
              <li>• Лицо должно быть четко видно</li>
              <li>• Избегайте сильно размытых изображений</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

const ContactsSection = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Контакты</h2>
        <p className="text-gray-600">Свяжитесь с нами</p>
      </div>

      <Card className="p-8">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Mail" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-gray-600">support@headcutout.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="MessageSquare" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Поддержка</h3>
              <p className="text-gray-600">Время работы: Пн-Пт, 9:00-18:00</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Globe" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Социальные сети</h3>
              <p className="text-gray-600">@headcutout</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Имя</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ваше имя"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Сообщение</label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ваше сообщение..."
              />
            </div>
            <Button className="w-full">
              <Icon name="Send" size={16} className="mr-2" />
              Отправить
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Index;
