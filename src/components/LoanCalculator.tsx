import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

const LoanCalculator = () => {
  const [amount, setAmount] = useState(10000);
  const [days, setDays] = useState(15);
  const dailyRate = 0.08;
  const isFirstLoan = true;

  const [interest, setInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [returnDate, setReturnDate] = useState('');

  useEffect(() => {
    const rate = isFirstLoan ? 0 : dailyRate;
    const calculatedInterest = (amount * rate * days) / 100;
    const total = amount + calculatedInterest;
    
    setInterest(calculatedInterest);
    setTotalPayment(total);

    const today = new Date();
    today.setDate(today.getDate() + days);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    setReturnDate(today.toLocaleDateString('ru-RU', options));
  }, [amount, days, isFirstLoan]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(num);
  };

  const incrementAmount = () => setAmount(prev => Math.min(prev + 1000, 30000));
  const decrementAmount = () => setAmount(prev => Math.max(prev - 1000, 3000));
  const incrementDays = () => setDays(prev => Math.min(prev + 1, 21));
  const decrementDays = () => setDays(prev => Math.max(prev - 1, 7));

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 flex items-center justify-center">
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-scale-in">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Первый заём <span className="text-pink-600">бесплатно</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8">ДЕНЬГИ У ВАС В 16:50</p>

          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Сумма</h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={decrementAmount}
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-400 transition-colors text-xl font-bold"
                  >
                    -
                  </button>
                  <div className="px-6 py-2 border-2 border-gray-300 rounded-lg min-w-[140px] text-center">
                    <span className="text-2xl font-semibold text-gray-800">{formatNumber(amount)} ₽</span>
                  </div>
                  <button
                    onClick={incrementAmount}
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-400 transition-colors text-xl font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
              <Slider
                value={[amount]}
                onValueChange={(val) => setAmount(val[0])}
                min={3000}
                max={30000}
                step={1000}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>от 3 000 ₽</span>
                <span>до 30 000 ₽</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Срок</h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={decrementDays}
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-400 transition-colors text-xl font-bold"
                  >
                    -
                  </button>
                  <div className="px-6 py-2 border-2 border-gray-300 rounded-lg min-w-[140px] text-center">
                    <span className="text-2xl font-semibold text-gray-800">{days} дней</span>
                  </div>
                  <button
                    onClick={incrementDays}
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-400 transition-colors text-xl font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
              <Slider
                value={[days]}
                onValueChange={(val) => setDays(val[0])}
                min={7}
                max={21}
                step={1}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>от 7 д</span>
                <span>до 21 д</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-1">Занимаете</p>
                <p className="text-2xl font-bold text-gray-800">{formatNumber(amount)} ₽</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Проценты/день</p>
                <div className="flex items-center gap-2">
                  {!isFirstLoan && (
                    <span className="text-lg text-gray-400 line-through">{dailyRate}%</span>
                  )}
                  <span className="text-2xl font-bold text-pink-600">0%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">К возврату</p>
                <p className="text-2xl font-bold text-gray-800">{formatNumber(totalPayment)} ₽</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <Icon name="Calendar" size={20} className="text-gray-400" />
              <span className="text-sm">В {returnDate}</span>
            </div>

            <Button 
              className="w-full h-14 text-lg font-bold bg-lime-400 hover:bg-lime-500 text-gray-800 rounded-xl shadow-lg transition-all"
            >
              ПОЛУЧИТЬ БЕСПЛАТНО
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
