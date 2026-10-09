export default function AuthModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Auth Modal Example</h1>
        
        {user ? (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-700 mb-4">
              <strong>Welcome!</strong> {user.email}
            </p>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setUser(null);
              }}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Open Login Modal
          </button>
        )}

        <AuthModal 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
          onLoginSuccess={setUser}
        />
      </div>
    </div>
  );
}