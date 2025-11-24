
import { Mood, CycleFlow } from '../types';

export const translations = {
  en: {
    // App Header
    title_part1: 'Mood',
    title_part2_cycle: '& Period',
    title_part3: 'Tracker',
    subtitle: 'Track your daily emotions and discover patterns in your wellness journey',
    settings: 'Open settings',

    // Daily Affirmation
    affirmationLabel: 'Affirmation of the day:',
    affirmationLoading: 'Loading your daily inspiration...',
    affirmationFallback: 'You have the power to create a beautiful day.',
    affirmations: [
      "You are enough just as you are.",
      "Today is a fresh start filled with opportunity.",
      "You are capable of amazing things.",
      "Breathe in calm, breathe out stress.",
      "You are worthy of love and respect.",
      "Your potential is limitless.",
      "Small steps lead to big changes.",
      "You are stronger than you think.",
      "Choose joy today.",
      "Your feelings are valid and important.",
      "Trust the timing of your life.",
      "You are in charge of your own happiness.",
      "Embrace the journey, not just the destination.",
      "You radiate positivity and light.",
      "Every challenge is an opportunity to grow."
    ],

    // Main Interaction Card
    howAreYouFeeling: 'How are you feeling on {date}?',
    viewingPastEntry: 'You are viewing a past entry.',
    logFutureError: 'You cannot log entries for future dates.',
    addNotePlaceholder: 'Add a short note...',
    addNotePlaceholderFuture: 'Cannot add notes for future dates.',
    saveEntry: 'Save Entry',
    updateEntry: 'Update Entry',
    deleteEntry: 'Delete Entry',
    saveEntryAria: 'Save entry for {date}',
    updateEntryAria: 'Update entry for {date}',
    deleteEntryAria: 'Delete entry for {date}',
    
    // Moods
    [Mood.Amazing]: 'Amazing',
    [Mood.Good]: 'Good',
    [Mood.Okay]: 'Okay',
    [Mood.Bad]: 'Bad',
    [Mood.Terrible]: 'Terrible',
    selectMood: 'Select mood: {mood}',
    
    // Cycle Tracker
    trackCycle: 'Track your cycle',
    todayPeriodDay: 'Today: Period Day {day}',
    periodStartsIn: 'Period starts in {days} {pluralDays}',
    day_one: 'day',
    day_two: 'days',
    day_five: 'days',
    [CycleFlow.Light]: 'Light',
    [CycleFlow.Medium]: 'Medium',
    [CycleFlow.Heavy]: 'Heavy',

    // Calendar
    calendar: 'Calendar',
    prevMonth: 'Previous month',
    nextMonth: 'Next month',
    weekDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    
    // Calendar Legend
    legendTitle: 'Predictions:',
    legendPeriod: 'Period',
    legendFertile: 'Fertile Window',
    legendOvulation: 'Ovulation',
    disclaimer: 'Predictions are estimates. Use for informational purposes only.',

    // Mood Summary
    moodSummary: 'Mood Summary',
    totalEntries: 'Total Entries',
    mostCommon: 'Most Common',
    noMood: 'N/A',
    positiveMood: 'Positive',
    neutralMood: 'Neutral',
    negativeMood: 'Negative',
    
    // Wellness Tips (formerly AI Tips)
    aiWellnessTips: 'Wellness Tips',
    getNewTips: 'Get New Tips',
    unlockTips: 'Keep logging your moods to unlock personalized wellness tips!',
    entriesToGo: '{count} more entries to go.',
    errorGeneratingTips: 'Could not generate tips at this moment.',
    wellnessTips: {
      [Mood.Amazing]: [
        "Share your joy with a friend or loved one.",
        "Write down exactly what made today great in the note section to see it next time you log in.",
        "Use this energy to tackle a task you've been putting off.",
        "Take a photo to capture this feeling.",
        "Spread the positivity—give someone a compliment.",
        "Reflect on your gratitude and what brings you happiness."
      ],
      [Mood.Good]: [
        "Keep the momentum going with a small productive habit.",
        "Treat yourself to a healthy snack you enjoy.",
        "Take a moment to appreciate the small things.",
        "Go for a short walk to enjoy the fresh air.",
        "Listen to your favorite uplifting song.",
        "Plan something fun for the weekend."
      ],
      [Mood.Okay]: [
        "Take a 5-minute break to stretch and breathe.",
        "Drink a glass of water to refresh yourself.",
        "Listen to a podcast or music that interests you.",
        "Tidy up one small area of your space.",
        "Step outside for a moment of nature.",
        "Read a chapter of a book you enjoy."
      ],
      [Mood.Bad]: [
        "Be gentle with yourself; it's okay to have off days.",
        "Take a few deep, slow breaths to center yourself.",
        "Step away from screens for 15 minutes.",
        "Do one small thing that brings you comfort.",
        "Write down one thing you are grateful for, no matter how small.",
        "Allow yourself to rest without guilt."
      ],
      [Mood.Terrible]: [
        "Reach out to a trusted friend or family member.",
        "Focus on just getting through the next hour.",
        "Wrap yourself in a cozy blanket and rest.",
        "Prioritize sleep and hydration today.",
        "Remember that feelings are temporary and this will pass.",
        "Practice self-compassion and kindness."
      ]
    },
    
    // Settings
    settingsTitle: 'Settings',
    closeSettings: 'Close settings',
    enableCycleTracking: 'Enable Cycle Tracking',
    cycleTrackingDescription: 'Turn this off to hide cycle tracking and predictions from the calendar.',
    enableReminders: 'Enable Daily Reminders',
    remindersDescription: 'Get a notification every day at 8 PM to remind you to log your mood.',
    remindersDeniedDescription: 'Notification permissions are blocked. Please enable them in your browser settings to use this feature.',
    notificationTitle: 'How are you feeling?',
    notificationBody: "Don't forget to log your mood in your Wellness Journal!",

    // Data Management
    dataManagement: 'Data Management',
    exportData: 'Export Data',
    exportDescription: 'Download all your entries and settings to a JSON file.',
    importData: 'Import Data',
    importDescription: 'Import data from a file. This will overwrite all current data.',
    importWarningMessage: 'Are you sure you want to import this file? All your current data will be permanently overwritten.',
    importError: 'Failed to import data. Please ensure the file is a valid export file and try again.',

    // Year View
    yearView: 'Year View',
    backToDashboard: 'Back to Dashboard',

    // Login Page
    loginSubtitle: 'Your personal wellness journal.',
    emailPlaceholder: 'Email address',
    passwordPlaceholder: 'Password',
    showPasswordAria: 'Show password',
    hidePasswordAria: 'Hide password',
    signInButton: 'Sign In',
    signUpButton: 'Sign Up',
    processingButton: 'Processing...',
    noAccountPrompt: "Don't have an account?",
    haveAccountPrompt: 'Already have an account?',
    continueAsGuest: 'Continue as Guest',
    errorBothFields: 'Please enter both email and password.',
    errorEmailInUse: 'This email is already in use. Please sign in.',
    errorWeakPassword: 'Password should be at least 6 characters.',
    errorInvalidCredentials: 'Invalid email or password.',
    errorUnexpected: 'An unexpected error occurred. Please try again.',
    forgotPasswordPrompt: 'Forgot Password?',
    resetPasswordTitle: 'Reset Password',
    resetPasswordInstructions: "Enter your email and we'll send you a link to reset your password.",
    sendResetLinkButton: 'Send Reset Link',
    backToLogin: 'Back to Login',
    resetLinkSentSuccess: 'Password reset link sent! Check your inbox.',
    errorUserNotFound: 'No account found with that email address.',
    errorEnterEmail: 'Please enter your email address.',
  },
  ru: {
    // App Header
    title_part1: 'Трекер настроения',
    title_part2_cycle: 'и цикла',
    title_part3: '',
    subtitle: 'Отслеживайте свои ежедневные эмоции и находите закономерности в своем самочувствии',
    settings: 'Открыть настройки',

    // Daily Affirmation
    affirmationLabel: 'Аффирмация дня:',
    affirmationLoading: 'Загружаем ваше ежедневное вдохновение...',
    affirmationFallback: 'В ваших силах создать прекрасный день.',
    affirmations: [
      "Вы самодостаточны.",
      "Сегодня — новое начало, полное возможностей.",
      "Вы способны на удивительные вещи.",
      "Вдыхайте спокойствие, выдыхайте стресс.",
      "Вы достойны любви и уважения.",
      "Ваш потенциал безграничен.",
      "Маленькие шаги ведут к большим переменам.",
      "Вы сильнее, чем думаете.",
      "Выберите радость сегодня.",
      "Ваши чувства важны.",
      "Верьте в свой жизненный путь.",
      "Вы сами отвечаете за свое счастье.",
      "Цените путь, а не только цель.",
      "Вы излучаете свет и позитив.",
      "Каждый вызов — это возможность для роста."
    ],

    // Main Interaction Card
    howAreYouFeeling: 'Как вы себя чувствуете {date}?',
    viewingPastEntry: 'Вы просматриваете прошлую запись.',
    logFutureError: 'Вы не можете делать записи на будущие даты.',
    addNotePlaceholder: 'Добавьте короткую заметку...',
    addNotePlaceholderFuture: 'Нельзя добавлять заметки на будущие даты.',
    saveEntry: 'Сохранить запись',
    updateEntry: 'Обновить запись',
    deleteEntry: 'Удалить запись',
    saveEntryAria: 'Сохранить запись для {date}',
    updateEntryAria: 'Обновить запись для {date}',
    deleteEntryAria: 'Удалить запись для {date}',

    // Moods
    [Mood.Amazing]: 'Потрясающе',
    [Mood.Good]: 'Хорошо',
    [Mood.Okay]: 'Нормально',
    [Mood.Bad]: 'Плохо',
    [Mood.Terrible]: 'Ужасно',
    selectMood: 'Выбрать настроение: {mood}',

    // Cycle Tracker
    trackCycle: 'Отслеживать цикл',
    todayPeriodDay: 'Сегодня: {day}-й день',
    periodStartsIn: 'Цикл начнется через {days} {pluralDays}',
    day_one: 'день',
    day_two: 'дня',
    day_five: 'дней',
    [CycleFlow.Light]: 'Слабые',
    [CycleFlow.Medium]: 'Средние',
    [CycleFlow.Heavy]: 'Обильные',

    // Calendar
    calendar: 'Календарь',
    prevMonth: 'Предыдущий месяц',
    nextMonth: 'Следующий месяц',
    weekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    
    // Calendar Legend
    legendTitle: 'Прогнозы:',
    legendPeriod: 'Период',
    legendFertile: 'Фертильное окно',
    legendOvulation: 'Овуляция',
    disclaimer: 'Прогнозы являются оценкой. Используйте только в информационных целях.',

    // Mood Summary
    moodSummary: 'Сводка настроения',
    totalEntries: 'Всего записей',
    mostCommon: 'Чаще всего',
    noMood: 'Н/Д',
    positiveMood: 'Позитивное',
    neutralMood: 'Нейтральное',
    negativeMood: 'Негативное',

    // Wellness Tips (formerly AI Tips)
    aiWellnessTips: 'Советы для здоровья',
    getNewTips: 'Новые советы',
    unlockTips: 'Продолжайте записывать настроение, чтобы получить персональные советы!',
    entriesToGo: 'Осталось {count} записей.',
    errorGeneratingTips: 'Не удалось сгенерировать советы в данный момент.',
    wellnessTips: {
      [Mood.Amazing]: [
        "Поделитесь радостью с другом или близким.",
        "Запишите в заметках приложения, что именно сделало день отличным, чтобы увидеть это при следующем входе.",
        "Используйте эту энергию для важных дел.",
        "Сделайте фото, чтобы запомнить этот момент.",
        "Сделайте кому-нибудь комплимент.",
        "Подумайте, за что вы благодарны сегодня."
      ],
      [Mood.Good]: [
        "Поддержите ритм полезной привычкой.",
        "Угостите себя чем-то вкусным и полезным.",
        "Найдите минутку, чтобы оценить мелочи.",
        "Прогуляйтесь на свежем воздухе.",
        "Послушайте любимую музыку.",
        "Запланируйте что-то интересное на выходные."
      ],
      [Mood.Okay]: [
        "Сделайте 5-минутный перерыв на разминку.",
        "Выпейте стакан воды.",
        "Послушайте интересный подкаст.",
        "Приберитесь в одном маленьком уголке.",
        "Выйдите на улицу на пару минут.",
        "Почитайте главу любимой книги."
      ],
      [Mood.Bad]: [
        "Будьте добры к себе, плохие дни бывают.",
        "Сделайте несколько глубоких вдохов.",
        "Отвлекитесь от экранов на 15 минут.",
        "Сделайте то, что приносит вам уют.",
        "Запишите одну вещь, за которую вы благодарны.",
        "Позвольте себе отдохнуть без чувства вины."
      ],
      [Mood.Terrible]: [
        "Позвоните доверенному другу или родственнику.",
        "Сосредоточьтесь на простых действиях.",
        "Укутайтесь в плед и отдохните.",
        "Поставьте в приоритет сон и отдых.",
        "Помните, что это временно и пройдет.",
        "Проявите к себе сострадание и доброту."
      ]
    },

    // Settings
    settingsTitle: 'Настройки',
    closeSettings: 'Закрыть настройки',
    enableCycleTracking: 'Включить отслеживание цикла',
    cycleTrackingDescription: 'Отключите, чтобы скрыть отслеживание цикла и прогнозы в календаре.',
    enableReminders: 'Включить ежедневные напоминания',
    remindersDescription: 'Получайте уведомление каждый день в 20:00, чтобы не забыть записать свое настроение.',
    remindersDeniedDescription: 'Уведомления заблокированы. Пожалуйста, включите их в настройках вашего браузера, чтобы использовать эту функцию.',
    notificationTitle: 'Как вы себя чувствуете?',
    notificationBody: 'Не забудьте записать свое настроение в Дневнике хорошего самочувствия!',
    
    // Data Management
    dataManagement: 'Управление данными',
    exportData: 'Экспорт данных',
    exportDescription: 'Загрузите все свои записи и настройки в файл JSON.',
    importData: 'Импорт данных',
    importDescription: 'Импортируйте данные из файла. Это перезапишет все текущие данные.',
    importWarningMessage: 'Вы уверены, что хотите импортировать этот файл? Все ваши текущие данные будут безвозвратно перезаписаны.',
    importError: 'Не удалось импортировать данные. Убедитесь, что файл является действительным файлом экспорта, и попробуйте снова.',

    // Year View
    yearView: 'Годовой обзор',
    backToDashboard: 'Назад к панели',

    // Login Page
    loginSubtitle: 'Ваш личный дневник хорошего самочувствия.',
    emailPlaceholder: 'Адрес электронной почты',
    passwordPlaceholder: 'Пароль',
    showPasswordAria: 'Показать пароль',
    hidePasswordAria: 'Скрыть пароль',
    signInButton: 'Войти',
    signUpButton: 'Зарегистрироваться',
    processingButton: 'Обработка...',
    noAccountPrompt: 'Нет аккаунта?',
    haveAccountPrompt: 'Уже есть аккаунт?',
    continueAsGuest: 'Продолжить как гость',
    errorBothFields: 'Пожалуйста, введите и email, и пароль.',
    errorEmailInUse: 'Этот email уже используется. Пожалуйста, войдите.',
    errorWeakPassword: 'Пароль должен содержать не менее 6 символов.',
    errorInvalidCredentials: 'Неверный email или пароль.',
    errorUnexpected: 'Произошла непредвиденная ошибка. Пожалуйста, попробуйте снова.',
    forgotPasswordPrompt: 'Забыли пароль?',
    resetPasswordTitle: 'Сброс пароля',
    resetPasswordInstructions: 'Введите ваш email, и мы отправим вам ссылку для сброса пароля.',
    sendResetLinkButton: 'Отправить ссылку',
    backToLogin: 'Назад ко входу',
    resetLinkSentSuccess: 'Ссылка для сброса пароля отправлена! Проверьте ваш почтовый ящик.',
    errorUserNotFound: 'Аккаунт с таким email не найден.',
    errorEnterEmail: 'Пожалуйста, введите ваш email.',
  },
};
