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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 py-4 md:py-8 px-3 sm:px-4 md:px-6 flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      
      <div className="w-full max-w-2xl relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl border border-blue-100 p-5 sm:p-6 md:p-10 lg:p-12 animate-fade-in hover:shadow-blue-200/50 transition-shadow duration-500">
          <div className="mb-6 md:mb-8 animate-slide-down">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent mb-2 leading-tight">
              Первый заём <span className="bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">бесплатно</span>
            </h1>
            <p className="text-blue-600 text-base sm:text-lg md:text-xl font-semibold flex items-center gap-2">
              <Icon name="Clock" size={20} className="text-cyan-500" />
              ДЕНЬГИ У ВАС В 16:50
            </p>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div className="transform transition-all duration-300 hover:scale-[1.01]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3 sm:gap-0">
                <h2 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-2">
                  <Icon name="DollarSign" size={20} className="text-blue-500" />
                  Сумма
                </h2>
                <div className="flex items-center gap-2 sm:gap-3 justify-center sm:justify-end">
                  <button
                    onClick={decrementAmount}
                    className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white flex items-center justify-center hover:from-blue-600 hover:to-cyan-700 active:scale-95 transition-all duration-200 text-xl font-bold shadow-lg shadow-blue-200 touch-manipulation"
                  >
                    -
                  </button>
                  <div className="px-4 sm:px-6 py-2.5 md:py-3 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl min-w-[130px] sm:min-w-[150px] text-center shadow-inner animate-pulse-slow">
                    <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{formatNumber(amount)} ₽</span>
                  </div>
                  <button
                    onClick={incrementAmount}
                    className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white flex items-center justify-center hover:from-blue-600 hover:to-cyan-700 active:scale-95 transition-all duration-200 text-xl font-bold shadow-lg shadow-blue-200 touch-manipulation"
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
                className="mb-2 cursor-pointer touch-none"
              />
              <div className="flex justify-between text-xs sm:text-sm text-blue-400 px-1 font-medium">
                <span>от 3 000 ₽</span>
                <span>до 30 000 ₽</span>
              </div>
            </div>

            <div className="transform transition-all duration-300 hover:scale-[1.01]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3 sm:gap-0">
                <h2 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-2">
                  <Icon name="Calendar" size={20} className="text-cyan-500" />
                  Срок
                </h2>
                <div className="flex items-center gap-2 sm:gap-3 justify-center sm:justify-end">
                  <button
                    onClick={decrementDays}
                    className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center hover:from-cyan-600 hover:to-blue-700 active:scale-95 transition-all duration-200 text-xl font-bold shadow-lg shadow-cyan-200 touch-manipulation"
                  >
                    -
                  </button>
                  <div className="px-4 sm:px-6 py-2.5 md:py-3 bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-xl min-w-[130px] sm:min-w-[150px] text-center shadow-inner animate-pulse-slow">
                    <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">{days} дней</span>
                  </div>
                  <button
                    onClick={incrementDays}
                    className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center hover:from-cyan-600 hover:to-blue-700 active:scale-95 transition-all duration-200 text-xl font-bold shadow-lg shadow-cyan-200 touch-manipulation"
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
                className="mb-2 cursor-pointer touch-none"
              />
              <div className="flex justify-between text-xs sm:text-sm text-cyan-400 px-1 font-medium">
                <span>от 7 д</span>
                <span>до 21 д</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 py-5 md:py-6 border-t-2 border-b-2 border-blue-100 bg-gradient-to-r from-blue-50/50 via-cyan-50/50 to-blue-50/50 rounded-xl px-3 md:px-4">
              <div className="text-center transform transition-all duration-300 hover:scale-105">
                <p className="text-xs sm:text-sm text-blue-600 mb-1 font-medium">Занимаете</p>
                <p className="text-base sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent break-words">{formatNumber(amount)} ₽</p>
              </div>
              <div className="text-center transform transition-all duration-300 hover:scale-105">
                <p className="text-xs sm:text-sm text-blue-600 mb-1 font-medium">Проценты/день</p>
                <div className="flex items-center gap-1 flex-wrap justify-center">
                  {!isFirstLoan && (
                    <span className="text-sm sm:text-lg text-gray-400 line-through">{dailyRate}%</span>
                  )}
                  <span className="text-base sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">0%</span>
                </div>
              </div>
              <div className="text-center transform transition-all duration-300 hover:scale-105">
                <p className="text-xs sm:text-sm text-blue-600 mb-1 font-medium">К возврату</p>
                <p className="text-base sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent break-words">{formatNumber(totalPayment)} ₽</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-blue-600 px-1 bg-blue-50/50 rounded-lg py-3 border border-blue-100 animate-fade-in">
              <Icon name="CalendarCheck" size={20} className="text-cyan-500 flex-shrink-0" />
              <span className="text-sm md:text-base font-medium">Дата возврата: {returnDate}</span>
            </div>

            <Button 
              className="w-full h-12 sm:h-14 md:h-16 text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-lime-400 via-lime-500 to-lime-400 hover:from-lime-500 hover:via-lime-600 hover:to-lime-500 text-gray-800 rounded-xl shadow-2xl shadow-lime-300/50 hover:shadow-lime-400/60 transition-all duration-300 touch-manipulation relative overflow-hidden group animate-fade-in"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Icon name="Sparkles" size={22} className="group-hover:rotate-12 transition-transform duration-300" />
                ПОЛУЧИТЬ БЕСПЛАТНО
                <Icon name="ArrowRight" size={22} className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
