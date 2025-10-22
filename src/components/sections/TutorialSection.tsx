import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export const TutorialSection = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Как это работает</h2>
        <p className="text-gray-600">Простая инструкция по использованию сервиса</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        <Card className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Загрузите фото</h3>
              <p className="text-gray-600">
                Выберите фотографию человека с четко видимым лицом. Можно перетащить файл или выбрать через диалог.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">AI обработка</h3>
              <p className="text-gray-600">
                Нажмите кнопку "Вырезать голову". Искусственный интеллект автоматически распознает лицо и удалит фон.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Выберите образ</h3>
              <p className="text-gray-600">
                Выберите один из готовых шаблонов тела: бизнесмен, космонавт, супергерой или врач.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xl">4</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Настройте фон</h3>
              <p className="text-gray-600">
                Выберите цвет фона: прозрачный, белый или черный - в зависимости от ваших потребностей.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xl">5</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Скачайте результат</h3>
              <p className="text-gray-600">
                Нажмите "Создать образ", затем скачайте готовое изображение в формате PNG с прозрачным фоном.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-start space-x-4">
          <Icon name="Info" size={24} className="text-primary flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold mb-2">Советы для лучшего результата</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Используйте фото с хорошим освещением</li>
              <li>• Лицо должно быть повернуто к камере</li>
              <li>• Избегайте размытых или низкокачественных изображений</li>
              <li>• Рекомендуемый формат: JPG или PNG</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
