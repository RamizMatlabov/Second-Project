export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, phone, email, cardType, pickupPoint } = body || {};

    if (!fullName || !phone || !email || !cardType || !pickupPoint) {
      return new Response(
        JSON.stringify({ message: 'Заполните все обязательные поля формы.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    // Здесь может быть вызов реального бэкенда или сохранение в БД.
    // Сейчас имитируем небольшую задержку и успешный ответ.
    await new Promise((resolve) => setTimeout(resolve, 800));

    return new Response(
      JSON.stringify({
        message: 'Заявка на выпуск карты успешно принята. Наш специалист свяжется с вами.',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'Ошибка при обработке заявки. Попробуйте ещё раз позже.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}

