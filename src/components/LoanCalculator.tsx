import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface PaymentSchedule {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

const LoanCalculator = () => {
  const [amount, setAmount] = useState(300000);
  const [term, setTerm] = useState(12);
  const dailyRate = 0.08;

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [overpayment, setOverpayment] = useState(0);
  const [schedule, setSchedule] = useState<PaymentSchedule[]>([]);

  useEffect(() => {
    const monthlyRate = (dailyRate * 30) / 100;
    const payment = amount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    const total = payment * term;
    const over = total - amount;

    setMonthlyPayment(payment);
    setTotalPayment(total);
    setOverpayment(over);

    const newSchedule: PaymentSchedule[] = [];
    let balance = amount;

    for (let i = 1; i <= term; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = payment - interestPayment;
      balance -= principalPayment;

      newSchedule.push({
        month: i,
        payment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      });
    }

    setSchedule(newSchedule);
  }, [amount, term]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Калькулятор займов</h1>
          <p className="text-gray-600">Рассчитайте условия вашего займа</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-lg hover-scale animate-scale-in border-blue-100">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Icon name="Calculator" size={24} />
                Параметры займа
              </CardTitle>
              <CardDescription className="text-blue-50">
                Настройте условия кредитования
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-medium text-gray-700">Сумма займа</Label>
                  <span className="text-2xl font-bold text-blue-600">{formatNumber(amount)} ₽</span>
                </div>
                <Slider
                  value={[amount]}
                  onValueChange={(val) => setAmount(val[0])}
                  min={10000}
                  max={1000000}
                  step={10000}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>10 000 ₽</span>
                  <span>1 000 000 ₽</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-medium text-gray-700">Срок займа</Label>
                  <span className="text-2xl font-bold text-blue-600">{term} мес.</span>
                </div>
                <Slider
                  value={[term]}
                  onValueChange={(val) => setTerm(val[0])}
                  min={3}
                  max={60}
                  step={1}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>3 месяца</span>
                  <span>60 месяцев</span>
                </div>
              </div>


            </CardContent>
          </Card>

          <Card className="shadow-lg hover-scale animate-scale-in border-blue-100">
            <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Icon name="TrendingUp" size={24} />
                Результаты расчёта
              </CardTitle>
              <CardDescription className="text-blue-50">
                Итоговые показатели по займу
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm text-gray-600 mb-1">Ежемесячный платёж</p>
                <p className="text-3xl font-bold text-blue-600">{formatNumber(monthlyPayment)} ₽</p>
              </div>

              <div className="bg-cyan-50 p-4 rounded-lg border-l-4 border-cyan-500">
                <p className="text-sm text-gray-600 mb-1">Общая сумма выплат</p>
                <p className="text-2xl font-bold text-cyan-600">{formatNumber(totalPayment)} ₽</p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <p className="text-sm text-gray-600 mb-1">Переплата по займу</p>
                <p className="text-2xl font-bold text-orange-600">{formatNumber(overpayment)} ₽</p>
              </div>

              <div className="pt-2 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ставка:</span>
                  <span className="font-semibold text-gray-800">{dailyRate}% в день</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ставка в месяц:</span>
                  <span className="font-semibold text-gray-800">{(dailyRate * 30).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Переплата от суммы:</span>
                  <span className="font-semibold text-gray-800">{((overpayment / amount) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 shadow-lg animate-fade-in border-blue-100">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <CardTitle className="flex items-center gap-2">
              <Icon name="BarChart3" size={24} />
              График платежей
            </CardTitle>
            <CardDescription className="text-blue-50">
              Помесячная структура погашения займа
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <div className="min-w-full space-y-2">
                <div className="grid grid-cols-5 gap-2 text-sm font-semibold text-gray-600 pb-2 border-b-2 border-blue-200">
                  <div>Месяц</div>
                  <div className="text-right">Платёж</div>
                  <div className="text-right">Основной долг</div>
                  <div className="text-right">Проценты</div>
                  <div className="text-right">Остаток</div>
                </div>
                <div className="max-h-96 overflow-y-auto space-y-1">
                  {schedule.map((item) => (
                    <div
                      key={item.month}
                      className="grid grid-cols-5 gap-2 text-sm py-2 px-2 rounded hover:bg-blue-50 transition-colors"
                    >
                      <div className="font-medium text-gray-700">{item.month}</div>
                      <div className="text-right text-gray-800">{formatNumber(item.payment)}</div>
                      <div className="text-right text-blue-600">{formatNumber(item.principal)}</div>
                      <div className="text-right text-orange-600">{formatNumber(item.interest)}</div>
                      <div className="text-right font-medium text-gray-700">{formatNumber(item.balance)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-4 justify-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-600 rounded"></div>
                  <span className="text-gray-600">Основной долг</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-600 rounded"></div>
                  <span className="text-gray-600">Проценты</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>💡 Расчёты носят информационный характер</p>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;