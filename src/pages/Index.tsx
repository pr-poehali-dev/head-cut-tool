import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { HomeSection } from '@/components/sections/HomeSection';
import { EditorSection } from '@/components/sections/EditorSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { TutorialSection } from '@/components/sections/TutorialSection';
import { ContactsSection } from '@/components/sections/ContactsSection';

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

export default Index;
