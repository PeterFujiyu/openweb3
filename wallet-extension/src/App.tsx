import { useState } from 'react';
import { useWalletStore } from './store/useWalletStore';
import { WalletApp } from './components/WalletApp';
import { UnlockWallet } from './components/UnlockWallet';
import { OpenWeb3Welcome } from './components/OpenWeb3Welcome';
import { CreateWallet } from './components/CreateWallet';
import { ImportWallet } from './components/ImportWallet';
import { WalletPassword } from './components/WalletPassword';
import { AlertModal } from './components/ui';

function App() {
  const { isInitialized, isLocked } = useWalletStore();

  if (isInitialized) {
    if (isLocked) {
      return <UnlockWallet onUnlock={() => {}} />;
    }
    return <WalletApp />;
  }

  const [currentView, setCurrentView] = useState<'welcome' | 'create' | 'import' | 'import-password' | 'qr'>('welcome');
  const [importedMnemonic, setImportedMnemonic] = useState<string>('');
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info' as 'info' | 'success' | 'warning' | 'error'
  });

  const handleCreateWallet = () => {
    console.log('Creating new wallet...');
    setCurrentView('create');
  };

  const handleImportWallet = () => {
    console.log('Importing existing wallet...');
    // Navigate to import view
    setCurrentView('import');
  };

  const handleQRImport = () => {
    console.log('QR import...');
    alert('QR code import will be implemented!');
    // setCurrentView('qr');
  };

  const showAlert = (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    setAlertModal({
      isOpen: true,
      title,
      message,
      type
    });
  };

  const closeAlert = () => {
    setAlertModal(prev => ({ ...prev, isOpen: false }));
  };

  const handlePasswordContinue = (password: string) => {
    console.log('Password created:', password);
    showAlert('Next Step', 'Next step: Generate recovery phrase!', 'success');
    // Here you would proceed to generate the mnemonic phrase
    // setCurrentView('mnemonic');
  };

  const handleImportContinue = (mnemonic: string) => {
    console.log('Mnemonic entered:', mnemonic);
    setImportedMnemonic(mnemonic);
    setCurrentView('import-password');
  };

  const handleImportPasswordContinue = async (password: string) => {
    try {
      await useWalletStore.getState().importWallet(importedMnemonic, password);
      // On success, the main component will re-render and the top-level router
      // will automatically display the WalletApp component.
    } catch (error) {
      console.error("Failed to import wallet:", error);
      showAlert('Import Failed', 'Could not import wallet. Please check your mnemonic and try again.', 'error');
    }
  };

  const handleBackToImport = () => {
    setCurrentView('import');
  };

  const handleBackToWelcome = () => {
    setCurrentView('welcome');
  };

  if (currentView === 'welcome') {
    return (
      <OpenWeb3Welcome
        onCreateWallet={handleCreateWallet}
        onImportWallet={handleImportWallet}
        onQRImport={handleQRImport}
      />
    );
  }

  if (currentView === 'create') {
    return (
      <>
        <CreateWallet
          onBack={handleBackToWelcome}
          onContinue={handlePasswordContinue}
        />

        {/* Alert Modal */}
        <AlertModal
          isOpen={alertModal.isOpen}
          onClose={closeAlert}
          title={alertModal.title}
          message={alertModal.message}
          type={alertModal.type}
        />
      </>
    );
  }

  if (currentView === 'import') {
    return (
      <>
        <ImportWallet
          onBack={handleBackToWelcome}
          onContinue={handleImportContinue}
        />

        {/* Alert Modal */}
        <AlertModal
          isOpen={alertModal.isOpen}
          onClose={closeAlert}
          title={alertModal.title}
          message={alertModal.message}
          type={alertModal.type}
        />
      </>
    );
  }

  if (currentView === 'import-password') {
    return (
      <>
        <WalletPassword
          onBack={handleBackToImport}
          onContinue={handleImportPasswordContinue}
          title="Create Password"
          description="Create a secure password to protect your imported wallet"
          isImport={true}
          mnemonic={importedMnemonic}
        />

        {/* Alert Modal */}
        <AlertModal
          isOpen={alertModal.isOpen}
          onClose={closeAlert}
          title={alertModal.title}
          message={alertModal.message}
          type={alertModal.type}
        />
      </>
    );
  }

  // Placeholder for other views
  return (
    <>
      <div className="w-[375px] h-[600px] bg-gray-900 text-white rounded-2xl shadow-2xl flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Coming Soon</h2>
          <button
            onClick={() => setCurrentView('welcome')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Back to Welcome
          </button>
        </div>
      </div>

      {/* Alert Modal */}
      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={closeAlert}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
      />
    </>
  );
}

export default App;