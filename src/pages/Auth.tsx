
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Eye, EyeOff, Star, Zap, Shield } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log('User authenticated, redirecting to home');
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Bitte E-Mail und Passwort eingeben');
      return;
    }

    setIsLoading(true);
    console.log('Form submitted:', { isLogin, email });

    try {
      if (isLogin) {
        console.log('Attempting login...');
        const { error } = await signIn(email, password);
        if (error) {
          console.error('Login error:', error);
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Ungültige Anmeldedaten. Bitte überprüfen Sie E-Mail und Passwort.');
          } else {
            toast.error('Anmeldung fehlgeschlagen: ' + error.message);
          }
        } else {
          console.log('Login successful');
          toast.success('Erfolgreich angemeldet!');
          // Navigation wird durch useEffect ausgelöst
        }
      } else {
        console.log('Attempting signup...');
        const { error } = await signUp(email, password);
        if (error) {
          console.error('Signup error:', error);
          if (error.message.includes('User already registered')) {
            toast.error('Benutzer bereits registriert. Versuchen Sie sich anzumelden.');
            setIsLogin(true);
          } else {
            toast.error('Registrierung fehlgeschlagen: ' + error.message);
          }
        } else {
          console.log('Signup successful');
          toast.success('Registrierung erfolgreich! Sie können sich jetzt anmelden.');
          setIsLogin(true);
          setPassword(''); // Passwort leeren für die Anmeldung
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error('Ein unerwarteter Fehler ist aufgetreten');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-32 left-32 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-amber-300 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-60 left-1/2 w-1 h-1 bg-blue-300 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Logo and Title */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              STERNENHIMMELAUTO
            </h2>
            <p className="text-gray-400">
              {isLogin ? 'Willkommen zurück!' : 'Werden Sie Teil unserer Community'}
            </p>
          </div>

          {/* Auth Card */}
          <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700/50 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-white">
                {isLogin ? 'Anmelden' : 'Registrieren'}
              </CardTitle>
              <p className="text-gray-400 text-sm">
                {isLogin ? 'Melden Sie sich in Ihrem Konto an' : 'Erstellen Sie ein neues Konto'}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300 font-medium">E-Mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-amber-400 focus:ring-amber-400/20 h-12"
                    placeholder="ihre@email.de"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300 font-medium">Passwort</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-amber-400 focus:ring-amber-400/20 h-12 pr-12"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {!isLogin && (
                    <p className="text-xs text-gray-400">Mindestens 6 Zeichen</p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-semibold h-12 text-base shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      {isLogin ? 'Anmelden...' : 'Registrieren...'}
                    </div>
                  ) : (
                    isLogin ? 'Anmelden' : 'Registrieren'
                  )}
                </Button>
              </form>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setPassword(''); // Passwort leeren beim Wechsel
                  }}
                  className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
                >
                  {isLogin ? 'Noch kein Konto? Jetzt registrieren' : 'Bereits ein Konto? Jetzt anmelden'}
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-xs text-gray-400">Schnell</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 bg-green-600/20 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-xs text-gray-400">Sicher</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 bg-amber-600/20 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-amber-400" />
              </div>
              <p className="text-xs text-gray-400">Premium</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
