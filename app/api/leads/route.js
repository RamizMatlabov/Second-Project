import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // В реальном приложении здесь была бы логика сохранения в базу данных или отправки email
    console.log('New lead received:', body);

    // Имитация задержки обработки
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ 
      success: true, 
      message: 'Заявка успешно получена' 
    }, { status: 200 });

  } catch (error) {
    console.error('Error processing lead:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Ошибка при обработке заявки' 
    }, { status: 500 });
  }
}
