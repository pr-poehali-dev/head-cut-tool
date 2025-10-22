import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export const ContactsSection = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Контакты</h2>
        <p className="text-gray-600">Свяжитесь с нами по любым вопросам</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="p-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Mail" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <a href="mailto:support@headcutout.com" className="text-primary hover:underline">
                  support@headcutout.com
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="MessageCircle" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Telegram</h3>
                <a href="https://t.me/headcutout" className="text-primary hover:underline">
                  @headcutout
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Phone" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Телефон</h3>
                <a href="tel:+79991234567" className="text-primary hover:underline">
                  +7 (999) 123-45-67
                </a>
              </div>
            </div>

            <div className="pt-6 border-t">
              <h3 className="font-semibold mb-4">Отправить сообщение</h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Ваше сообщение"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  ></textarea>
                </div>
                <Button type="submit" className="w-full">
                  <Icon name="Send" size={16} className="mr-2" />
                  Отправить
                </Button>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
