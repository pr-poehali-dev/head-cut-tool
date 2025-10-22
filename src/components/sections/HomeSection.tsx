import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface HomeSectionProps {
  onStartEditing: () => void;
}

export const HomeSection = ({ onStartEditing }: HomeSectionProps) => {
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
