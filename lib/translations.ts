
import { Mood, CycleFlow } from '../types';

export const translations = {
  en: {
    // App Header
    title_part1: 'Mood',
    title_part2_cycle: '& Period',
    title_part3: 'Tracker',
    subtitle: 'Track your daily emotions and discover patterns in your wellness journey',
    practicesTitle: 'Practices',
    yearOverviewTitle: 'Year Overview',
    profileTitle: 'Profile',
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
    updateEntry: 'Update',
    deleteEntry: 'Delete',
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
    
    // Share App
    shareApp: 'Share app with friends',
    shareAppMessage: 'Check out this amazing app for tracking your mood and cycle! Download Mood & Period Tracker today.',
    shareAppUrl: 'https://play.google.com/store/apps/details?id=com.moodtracker.app',

    // Rate App
    rateUs: 'Rate us',
    rateUsMessage: 'We\'re a small team building this app with care 💜 If you\'re enjoying it, your rating really helps us grow.',
    rateAppUrl: 'https://play.google.com/store/apps/details?id=com.moodtracker.app',

    // Micro-Diary
    microDiary: 'Micro-Diary',
    todaysReflection: 'Today\'s Reflection',
    reflectionExplanationTitle: 'Reflection exercise (daily, 1–3 minutes)',
    reflectionExplanationText: ' - one of the most powerful tools for caring for your mental well-being. Noting your thoughts helps you see patterns, discover what lifts your spirits. Journaling can support coping and reduce the impact of stressful events – potentially avoiding burnout and chronic anxiety.',
    reflectionLearnMore: 'Learn more about the benefits of journaling',

    // Practices
    practices: 'Practices',
    practicesSubtitle: 'Gentle tools for mood awareness and well-being',
    dailyReflection: 'Daily Reflection (Micro-Diary)',
    dailyReflectionDesc: 'One of the most powerful tools for understanding and improving your mood.',
    dailyReflectionTime: '2–3 minutes',
    gratitudePractice: 'Gratitude Practice',
    gratitudePracticeDesc: 'Notice small positive moments from today.',
    gratitudePracticeTime: '1–2 minutes',
    moodInfluencers: 'Mood Influencers',
    moodInfluencersDesc: 'Identify what influenced your mood today.',
    moodInfluencersTime: '1 minute',
    oneMinuteReset: '1-Minute Reset',
    oneMinuteResetDesc: 'A quick pause to calm your body and mind.',
    oneMinuteResetTime: '1 minute',
    helpfulReading: 'Helpful Reading',
    helpfulReadingDesc: 'Short articles to support mood and self-care.',
    helpfulReadingTime: 'Optional',
    backToPractices: 'Back to Practices',

    reflectionPrompt1: 'What made you feel good today?',
    reflectionPrompt2: 'What drained your energy today?',
    reflectionPrompt1Yesterday: 'What made you feel good yesterday?',
    reflectionPrompt2Yesterday: 'What drained your energy yesterday?',
    reflectionForDate: 'Reflection for {date}',
    today: 'Today',
    yesterday: 'Yesterday',
    reflectionHistory: 'Reflection History',
    noReflections: 'No reflections yet. Start by adding today\'s reflection above.',
    reflectionSaved: 'Thank you for taking a moment for yourself.',
    gratitudeHistory: 'Gratitude History',
    noGratitudeEntries: 'No gratitude entries yet. Start by adding today\'s gratitude above.',
    gratitudeSaved: 'Gratitude saved!',
    moodInfluencersHistory: 'Mood Influencers History',
    noMoodInfluencersEntries: 'No mood influencer entries yet. Start by adding today\'s mood influencers above.',
    moodInfluencersSaved: 'Mood influencers saved!',
    shortNotesEnough: 'Short notes are enough 💜',
    exportHistoryAsPDF: 'Export History as PDF',
    exportReflections: 'Export Reflections',
    exportAll: 'Export All',
    exportRange: 'Export Date Range',
    fromDate: 'From',
    toDate: 'To',
    cancel: 'Cancel',
    export: 'Export',

    // Delete Account
    deleteAccount: 'Delete account',
    deleteAccountWarning: 'This action cannot be undone',
    deleteAccountDescription: 'This will permanently delete your account and all your mood tracking data, period information, and notes. You will not be able to recover this data.',
    deleteAccountConfirm: 'Type "DELETE" to confirm',
    deleteAccountPlaceholder: 'Type DELETE here',
    deleteAccountCancel: 'Cancel',
    deleteAccountDelete: 'Delete account',
    deleteAccountSuccess: 'Account deleted successfully',
    deleteAccountError: 'Failed to delete account. Please try again or contact support.',

    // Settings
    settingsTitle: 'Settings',
    language: 'Language',
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
  es: {
    // App Header
    title_part1: 'Rastreador de',
    title_part2_cycle: 'Estado de Ánimo y Ciclo',
    title_part3: '',
    subtitle: 'Sigue tus emociones diarias y descubre patrones en tu bienestar',
    practicesTitle: 'Prácticas',
    practicesSubtitle: 'Herramientas suaves para la conciencia emocional',
    yearOverviewTitle: 'Vista Anual',
    profileTitle: 'Perfil',
    settings: 'Abrir configuración',

    // Daily Affirmation
    affirmationLabel: 'Afirmación del día:',
    affirmationLoading: 'Cargando tu inspiración diaria...',
    affirmationFallback: 'Tienes el poder de crear un día hermoso.',
    affirmations: [
      "Eres suficiente tal como eres.",
      "Hoy es un nuevo comienzo lleno de oportunidades.",
      "Eres capaz de cosas asombrosas.",
      "Inhala calma, exhala estrés.",
      "Mereces amor y respeto.",
      "Tu potencial es ilimitado.",
      "Los pasos pequeños llevan a cambios grandes.",
      "Eres más fuerte de lo que crees.",
      "Elige alegría hoy.",
      "Tus sentimientos son válidos e importantes.",
      "Confía en el timing de tu vida.",
      "Eres responsable de tu propia felicidad.",
      "Abraza el viaje, no solo el destino.",
      "Irradias positividad y luz.",
      "Cada desafío es una oportunidad para crecer."
    ],

    // Main Interaction Card
    howAreYouFeeling: '¿Cómo te sientes el {date}?',
    viewingPastEntry: 'Estás viendo una entrada anterior.',
    logFutureError: 'No puedes registrar entradas para fechas futuras.',
    addNotePlaceholder: 'Agrega una nota corta...',
    addNotePlaceholderFuture: 'No se pueden agregar notas para fechas futuras.',
    saveEntry: 'Guardar entrada',
    updateEntry: 'Actualizar',
    deleteEntry: 'Eliminar',
    saveEntryAria: 'Guardar entrada para {date}',
    updateEntryAria: 'Actualizar entrada para {date}',
    deleteEntryAria: 'Eliminar entrada para {date}',

    // Moods
    [Mood.Amazing]: 'Increíble',
    [Mood.Good]: 'Bien',
    [Mood.Okay]: 'Regular',
    [Mood.Bad]: 'Mal',
    [Mood.Terrible]: 'Terrible',
    selectMood: 'Seleccionar estado de ánimo: {mood}',

    // Cycle Tracker
    trackCycle: 'Rastrear ciclo',
    todayPeriodDay: 'Hoy: Día {day} del período',
    periodStartsIn: 'El período comienza en {days} {pluralDays}',
    day_one: 'día',
    day_two: 'días',
    day_five: 'días',
    [CycleFlow.Light]: 'Ligero',
    [CycleFlow.Medium]: 'Medio',
    [CycleFlow.Heavy]: 'Abundante',

    // Calendar
    calendar: 'Calendario',
    prevMonth: 'Mes anterior',
    nextMonth: 'Mes siguiente',
    weekDays: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],

    // Calendar Legend
    legendTitle: 'Predicciones:',
    legendPeriod: 'Período',
    legendFertile: 'Ventana fértil',
    legendOvulation: 'Ovulación',
    disclaimer: 'Las predicciones son estimaciones. Úsalas solo con fines informativos.',

    // Mood Summary
    moodSummary: 'Resumen de estado de ánimo',
    totalEntries: 'Total de entradas',
    mostCommon: 'Más común',
    noMood: 'N/A',
    positiveMood: 'Positivo',
    neutralMood: 'Neutral',
    negativeMood: 'Negativo',

    // Wellness Tips
    aiWellnessTips: 'Consejos de bienestar',
    getNewTips: 'Obtener nuevos consejos',
    unlockTips: '¡Sigue registrando tus estados de ánimo para desbloquear consejos personalizados de bienestar!',
    entriesToGo: '{count} entradas más para ir.',
    errorGeneratingTips: 'No se pudieron generar consejos en este momento.',
    wellnessTips: {
      [Mood.Amazing]: [
        "Comparte tu alegría con un amigo o ser querido.",
        "Escribe en la sección de notas exactamente qué hizo que hoy fuera genial para verlo la próxima vez que inicies sesión.",
        "Usa esta energía para abordar una tarea que has estado posponiendo.",
        "Toma una foto para capturar este sentimiento.",
        "Extiende la positividad—dale un cumplido a alguien.",
        "Reflexiona sobre tu gratitud y lo que te aporta felicidad."
      ],
      [Mood.Good]: [
        "Mantén el impulso con un hábito productivo pequeño.",
        "Regálate un snack saludable que disfrutes.",
        "Toma un momento para apreciar las cosas pequeñas.",
        "Da un paseo corto para disfrutar del aire fresco.",
        "Escucha tu canción favorita que levante el ánimo.",
        "Planea algo divertido para el fin de semana."
      ],
      [Mood.Okay]: [
        "Toma un descanso de 5 minutos para estirarte y respirar.",
        "Bebe un vaso de agua para refrescarte.",
        "Escucha un podcast o música que te interese.",
        "Ordena un área pequeña de tu espacio.",
        "Sal al exterior por un momento de naturaleza.",
        "Lee un capítulo de un libro que disfrutes."
      ],
      [Mood.Bad]: [
        "Sé amable contigo misma; está bien tener días difíciles.",
        "Toma unas respiraciones profundas y lentas para centrarte.",
        "Apártate de las pantallas por 15 minutos.",
        "Haz una cosa pequeña que te proporcione comodidad.",
        "Escribe una cosa por la que estés agradecida, por pequeña que sea.",
        "Permítete descansar sin culpa."
      ],
      [Mood.Terrible]: [
        "Contacta a un amigo de confianza o familiar.",
        "Concéntrate en superar la próxima hora.",
        "Envuélvete en una manta cómoda y descansa.",
        "Prioriza el sueño y la hidratación hoy.",
        "Recuerda que los sentimientos son temporales y esto pasará.",
        "Practica la autocompasión y la bondad."
      ]
    },

    // Settings
    settingsTitle: 'Configuración',
    language: 'Idioma',
    closeSettings: 'Cerrar configuración',
    enableCycleTracking: 'Habilitar seguimiento del ciclo',
    cycleTrackingDescription: 'Desactívalo para ocultar el seguimiento del ciclo y las predicciones en el calendario.',
    enableReminders: 'Habilitar recordatorios diarios',
    remindersDescription: 'Recibe una notificación todos los días a las 8 PM para recordarte registrar tu estado de ánimo.',
    remindersDeniedDescription: 'Los permisos de notificación están bloqueados. Por favor, habilítalos en la configuración de tu navegador para usar esta función.',
    notificationTitle: '¿Cómo te sientes?',
    notificationBody: "¡No olvides registrar tu estado de ánimo en tu Diario de Bienestar!",

    // Data Management
    dataManagement: 'Gestión de datos',
    exportData: 'Exportar datos',
    exportDescription: 'Descarga todas tus entradas y configuraciones a un archivo JSON.',
    importData: 'Importar datos',
    importDescription: 'Importa datos desde un archivo. Esto sobrescribirá todos los datos actuales.',
    importWarningMessage: '¿Estás seguro de que quieres importar este archivo? Todos tus datos actuales serán sobrescritos permanentemente.',
    importError: 'Error al importar datos. Asegúrate de que el archivo sea un archivo de exportación válido e inténtalo de nuevo.',

    // Year View
    yearView: 'Vista anual',
    backToDashboard: 'Volver al panel',

    // Login Page
    loginSubtitle: 'Tu diario personal de bienestar.',
    emailPlaceholder: 'Dirección de correo electrónico',
    passwordPlaceholder: 'Contraseña',
    showPasswordAria: 'Mostrar contraseña',
    hidePasswordAria: 'Ocultar contraseña',
    signInButton: 'Iniciar sesión',
    signUpButton: 'Registrarse',
    processingButton: 'Procesando...',
    noAccountPrompt: "¿No tienes cuenta?",
    haveAccountPrompt: '¿Ya tienes cuenta?',
    continueAsGuest: 'Continuar como invitado',
    errorBothFields: 'Por favor ingresa tanto email como contraseña.',
    errorEmailInUse: 'Este email ya está en uso. Por favor inicia sesión.',
    errorWeakPassword: 'La contraseña debe tener al menos 6 caracteres.',
    errorInvalidCredentials: 'Email o contraseña inválidos.',
    errorUnexpected: 'Ocurrió un error inesperado. Por favor inténtalo de nuevo.',
    forgotPasswordPrompt: '¿Olvidaste tu contraseña?',
    resetPasswordTitle: 'Restablecer contraseña',
    resetPasswordInstructions: "Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.",
    sendResetLinkButton: 'Enviar enlace de restablecimiento',
    backToLogin: 'Volver al inicio de sesión',
    resetLinkSentSuccess: '¡Enlace de restablecimiento de contraseña enviado! Revisa tu bandeja de entrada.',
    errorUserNotFound: 'No se encontró una cuenta con esa dirección de email.',
    errorEnterEmail: 'Por favor ingresa tu dirección de email.',
  },
  'pt-BR': {
    // App Header
    title_part1: 'Rastreador de',
    title_part2_cycle: 'Humor e Ciclo',
    title_part3: '',
    subtitle: 'Acompanhe suas emoções diárias e descubra padrões em seu bem-estar',
    practicesTitle: 'Práticas',
    yearOverviewTitle: 'Visão Anual',
    profileTitle: 'Perfil',
    settings: 'Abrir configurações',

    // Daily Affirmation
    affirmationLabel: 'Afirmação do dia:',
    affirmationLoading: 'Carregando sua inspiração diária...',
    affirmationFallback: 'Você tem o poder de criar um dia bonito.',
    affirmations: [
      "Você é suficiente do jeito que é.",
      "Hoje é um novo começo cheio de oportunidades.",
      "Você é capaz de coisas incríveis.",
      "Inspire calma, expire estresse.",
      "Você merece amor e respeito.",
      "Seu potencial é ilimitado.",
      "Pequenos passos levam a grandes mudanças.",
      "Você é mais forte do que imagina.",
      "Escolha alegria hoje.",
      "Seus sentimentos são válidos e importantes.",
      "Confie no timing da sua vida.",
      "Você é responsável pela sua própria felicidade.",
      "Abrace a jornada, não apenas o destino.",
      "Você irradia positividade e luz.",
      "Cada desafio é uma oportunidade para crescer."
    ],

    // Main Interaction Card
    howAreYouFeeling: 'Como você está se sentindo em {date}?',
    viewingPastEntry: 'Você está visualizando uma entrada anterior.',
    logFutureError: 'Você não pode registrar entradas para datas futuras.',
    addNotePlaceholder: 'Adicione uma nota curta...',
    addNotePlaceholderFuture: 'Não é possível adicionar notas para datas futuras.',
    saveEntry: 'Salvar entrada',
    updateEntry: 'Atualizar',
    deleteEntry: 'Excluir',
    saveEntryAria: 'Salvar entrada para {date}',
    updateEntryAria: 'Atualizar entrada para {date}',
    deleteEntryAria: 'Excluir entrada para {date}',

    // Moods
    [Mood.Amazing]: 'Incrível',
    [Mood.Good]: 'Bem',
    [Mood.Okay]: 'Mais ou menos',
    [Mood.Bad]: 'Mal',
    [Mood.Terrible]: 'Terrível',
    selectMood: 'Selecionar humor: {mood}',

    // Cycle Tracker
    trackCycle: 'Rastrear ciclo',
    todayPeriodDay: 'Hoje: Dia {day} da menstruação',
    periodStartsIn: 'A menstruação começa em {days} {pluralDays}',
    day_one: 'dia',
    day_two: 'dias',
    day_five: 'dias',
    [CycleFlow.Light]: 'Leve',
    [CycleFlow.Medium]: 'Médio',
    [CycleFlow.Heavy]: 'Intenso',

    // Calendar
    calendar: 'Calendário',
    prevMonth: 'Mês anterior',
    nextMonth: 'Próximo mês',
    weekDays: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],

    // Calendar Legend
    legendTitle: 'Previsões:',
    legendPeriod: 'Menstruação',
    legendFertile: 'Janela fértil',
    legendOvulation: 'Ovulação',
    disclaimer: 'As previsões são estimativas. Use apenas para fins informativos.',

    // Mood Summary
    moodSummary: 'Resumo do humor',
    totalEntries: 'Total de entradas',
    mostCommon: 'Mais comum',
    noMood: 'N/A',
    positiveMood: 'Positivo',
    neutralMood: 'Neutro',
    negativeMood: 'Negativo',

    // Wellness Tips
    aiWellnessTips: 'Dicas de bem-estar',
    getNewTips: 'Obter novas dicas',
    unlockTips: 'Continue registrando seus humores para desbloquear dicas personalizadas de bem-estar!',
    entriesToGo: '{count} entradas restantes.',
    errorGeneratingTips: 'Não foi possível gerar dicas neste momento.',
    wellnessTips: {
      [Mood.Amazing]: [
        "Compartilhe sua alegria com um amigo ou ente querido.",
        "Escreva na seção de notas exatamente o que fez hoje ser incrível para ver na próxima vez que fizer login.",
        "Use essa energia para abordar uma tarefa que você vem adiando.",
        "Tire uma foto para capturar esse sentimento.",
        "Espalhe a positividade—dê um elogio a alguém.",
        "Reflita sobre sua gratidão e o que traz felicidade."
      ],
      [Mood.Good]: [
        "Mantenha o ímpeto com um hábito produtivo pequeno.",
        "Se dê um lanche saudável que você goste.",
        "Tire um momento para apreciar as coisas pequenas.",
        "Dê uma caminhada curta para aproveitar o ar fresco.",
        "Ouça sua música favorita que eleva o ânimo.",
        "Planeje algo divertido para o fim de semana."
      ],
      [Mood.Okay]: [
        "Faça uma pausa de 5 minutos para se alongar e respirar.",
        "Beba um copo de água para se refrescar.",
        "Ouça um podcast ou música que te interesse.",
        "Organize uma pequena área do seu espaço.",
        "Saia por um momento de natureza.",
        "Leia um capítulo de um livro que você gosta."
      ],
      [Mood.Bad]: [
        "Seja gentil consigo mesma; está tudo bem ter dias difíceis.",
        "Respire fundo algumas vezes para se centrar.",
        "Afaste-se das telas por 15 minutos.",
        "Faça uma coisa pequena que te proporcione conforto.",
        "Escreva uma coisa pela qual você é grata, por menor que seja.",
        "Permita-se descansar sem culpa."
      ],
      [Mood.Terrible]: [
        "Entre em contato com um amigo de confiança ou familiar.",
        "Concentre-se em superar a próxima hora.",
        "Enrole-se em uma manta confortável e descanse.",
        "Priorize sono e hidratação hoje.",
        "Lembre-se de que os sentimentos são temporários e isso passará.",
        "Pratique a autocompaixão e bondade."
      ]
    },

    // Share App
    shareApp: 'Compartilhar app com amigos',
    shareAppMessage: 'Confira este aplicativo incrível para rastrear seu humor e ciclo! Baixe o Mood & Period Tracker hoje.',
    shareAppUrl: 'https://play.google.com/store/apps/details?id=com.moodtracker.app',

    // Rate App
    rateUs: 'Avalie-nos',
    rateUsMessage: 'Somos uma equipe pequena criando este app com cuidado 💜 Se você está gostando, sua avaliação nos ajuda muito a crescer.',
    rateAppUrl: 'https://play.google.com/store/apps/details?id=com.moodtracker.app',

    // Micro-Diary
    microDiary: 'Micro-diário',
    todaysReflection: 'Reflexão de hoje',
    reflectionExplanationTitle: 'Exercício de reflexão (diariamente, 1–3 minutos)',
    reflectionExplanationText: ' - uma das ferramentas mais poderosas para cuidar do seu bem-estar mental. Anotar seus pensamentos ajuda a ver padrões, descobrir o que eleva seu ânimo. Manter um diário pode apoiar o enfrentamento e reduzir o impacto de eventos estressantes – potencialmente evitando burnout e ansiedade crônica.',
    reflectionLearnMore: 'Saiba mais sobre os benefícios do diário',

    // Practices
    practices: 'Práticas',
    practicesSubtitle: 'Ferramentas gentis para consciência do humor e bem-estar',
    dailyReflection: 'Reflexão Diária (Micro-diário)',
    dailyReflectionDesc: 'Uma das ferramentas mais poderosas para entender e melhorar seu humor.',
    dailyReflectionTime: '2–3 minutos',
    gratitudePractice: 'Prática de Gratidão',
    gratitudePracticeDesc: 'Observe pequenos momentos positivos de hoje.',
    gratitudePracticeTime: '1–2 minutos',
    moodInfluencers: 'Influenciadores do Humor',
    moodInfluencersDesc: 'Identifique o que influenciou seu humor hoje.',
    moodInfluencersTime: '1 minuto',
    oneMinuteReset: 'Reinício de 1 Minuto',
    oneMinuteResetDesc: 'Uma pausa rápida para acalmar o corpo e a mente.',
    oneMinuteResetTime: '1 minuto',
    helpfulReading: 'Leitura Útil',
    helpfulReadingDesc: 'Artigos curtos para apoiar humor e autocuidado.',
    helpfulReadingTime: 'Opcional',
    backToPractices: 'Voltar às Práticas',

    reflectionPrompt1: 'O que te fez se sentir bem hoje?',
    reflectionPrompt2: 'O que drenou sua energia hoje?',
    reflectionHistory: 'Histórico de reflexões',
    noReflections: 'Ainda não há reflexões. Comece adicionando a reflexão de hoje acima.',
    reflectionSaved: 'Obrigada por dedicar um momento para si mesma.',
    shortNotesEnough: 'Notas curtas são suficientes 💜',
    exportHistoryAsPDF: 'Exportar Histórico como PDF',
    exportReflections: 'Exportar Reflexões',
    exportAll: 'Exportar tudo',
    exportRange: 'Exportar intervalo de datas',
    fromDate: 'De',
    toDate: 'Até',
    cancel: 'Cancelar',
    export: 'Exportar',

    // Delete Account
    deleteAccount: 'Excluir conta',
    deleteAccountWarning: 'Esta ação não pode ser desfeita',
    deleteAccountDescription: 'Isso excluirá permanentemente sua conta e todos os dados de rastreamento de humor, informações sobre período e notas. Você não poderá recuperar esses dados.',
    deleteAccountConfirm: 'Digite "DELETE" para confirmar',
    deleteAccountPlaceholder: 'Digite DELETE aqui',
    deleteAccountCancel: 'Cancelar',
    deleteAccountDelete: 'Excluir conta',
    deleteAccountSuccess: 'Conta excluída com sucesso',
    deleteAccountError: 'Falha ao excluir conta. Tente novamente ou entre em contato com o suporte.',

    // Settings
    settingsTitle: 'Configurações',
    language: 'Idioma',
    closeSettings: 'Fechar configurações',
    enableCycleTracking: 'Habilitar rastreamento de ciclo',
    cycleTrackingDescription: 'Desative para ocultar o rastreamento de ciclo e previsões no calendário.',
    enableReminders: 'Habilitar lembretes diários',
    remindersDescription: 'Receba uma notificação todos os dias às 20h para lembrá-lo de registrar seu humor.',
    remindersDeniedDescription: 'As permissões de notificação estão bloqueadas. Por favor, habilite-as nas configurações do seu navegador para usar esta função.',
    notificationTitle: 'Como você está se sentindo?',
    notificationBody: "Não esqueça de registrar seu humor no seu Diário de Bem-estar!",

    // Data Management
    dataManagement: 'Gerenciamento de dados',
    exportData: 'Exportar dados',
    exportDescription: 'Baixe todas as suas entradas e configurações para um arquivo JSON.',
    importData: 'Importar dados',
    importDescription: 'Importe dados de um arquivo. Isso sobrescreverá todos os dados atuais.',
    importWarningMessage: 'Tem certeza de que deseja importar este arquivo? Todos os seus dados atuais serão sobrescritos permanentemente.',
    importError: 'Erro ao importar dados. Certifique-se de que o arquivo seja um arquivo de exportação válido e tente novamente.',

    // Year View
    yearView: 'Visualização anual',
    backToDashboard: 'Voltar ao painel',

    // Login Page
    loginSubtitle: 'Seu diário pessoal de bem-estar.',
    emailPlaceholder: 'Endereço de e-mail',
    passwordPlaceholder: 'Senha',
    showPasswordAria: 'Mostrar senha',
    hidePasswordAria: 'Ocultar senha',
    signInButton: 'Entrar',
    signUpButton: 'Cadastrar',
    processingButton: 'Processando...',
    noAccountPrompt: 'Não tem conta?',
    haveAccountPrompt: 'Já tem conta?',
    continueAsGuest: 'Continuar como convidado',
    errorBothFields: 'Por favor, digite email e senha.',
    errorEmailInUse: 'Este email já está em uso. Por favor, faça login.',
    errorWeakPassword: 'A senha deve ter pelo menos 6 caracteres.',
    errorInvalidCredentials: 'Email ou senha inválidos.',
    errorUnexpected: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
    forgotPasswordPrompt: 'Esqueceu a senha?',
    resetPasswordTitle: 'Redefinir senha',
    resetPasswordInstructions: 'Digite seu email e enviaremos um link para redefinir sua senha.',
    sendResetLinkButton: 'Enviar link de redefinição',
    backToLogin: 'Voltar ao login',
    resetLinkSentSuccess: 'Link de redefinição de senha enviado! Verifique sua caixa de entrada.',
    errorUserNotFound: 'Nenhuma conta encontrada com esse endereço de email.',
    errorEnterEmail: 'Por favor, digite seu endereço de email.',
  },
  fr: {
    // App Header
    title_part1: 'Suivi de',
    title_part2_cycle: "l'Humeur et du Cycle",
    title_part3: '',
    subtitle: 'Suivez vos émotions quotidiennes et découvrez les schémas de votre bien-être',
    practicesTitle: 'Pratiques',
    yearOverviewTitle: 'Vue Annuelle',
    profileTitle: 'Profil',
    settings: 'Ouvrir les paramètres',

    // Daily Affirmation
    affirmationLabel: 'Affirmation du jour :',
    affirmationLoading: 'Chargement de votre inspiration quotidienne...',
    affirmationFallback: 'Vous avez le pouvoir de créer une belle journée.',
    affirmations: [
      "Vous êtes assez tel que vous êtes.",
      "Aujourd'hui est un nouveau départ rempli d'opportunités.",
      "Vous êtes capable de choses étonnantes.",
      "Inspirez le calme, expirez le stress.",
      "Vous méritez l'amour et le respect.",
      "Votre potentiel est illimité.",
      "Les petits pas mènent à de grands changements.",
      "Vous êtes plus fort que vous ne le pensez.",
      "Choisissez la joie aujourd'hui.",
      "Vos sentiments sont valides et importants.",
      "Faites confiance au timing de votre vie.",
      "Vous êtes responsable de votre propre bonheur.",
      "Embrassez le voyage, pas seulement la destination.",
      "Vous rayonnez positivité et lumière.",
      "Chaque défi est une opportunité de grandir."
    ],

    // Main Interaction Card
    howAreYouFeeling: 'Comment vous sentez-vous le {date} ?',
    viewingPastEntry: 'Vous consultez une entrée précédente.',
    logFutureError: 'Vous ne pouvez pas enregistrer d\'entrées pour des dates futures.',
    addNotePlaceholder: 'Ajoutez une courte note...',
    addNotePlaceholderFuture: 'Impossible d\'ajouter des notes pour des dates futures.',
    saveEntry: 'Enregistrer l\'entrée',
    updateEntry: 'Mettre à jour',
    deleteEntry: 'Supprimer',
    saveEntryAria: 'Enregistrer l\'entrée pour {date}',
    updateEntryAria: 'Mettre à jour l\'entrée pour {date}',
    deleteEntryAria: 'Supprimer l\'entrée pour {date}',

    // Moods
    [Mood.Amazing]: 'Fabuleux',
    [Mood.Good]: 'Bien',
    [Mood.Okay]: 'Correct',
    [Mood.Bad]: 'Mal',
    [Mood.Terrible]: 'Terrible',
    selectMood: 'Sélectionner humeur : {mood}',

    // Cycle Tracker
    trackCycle: 'Suivre le cycle',
    todayPeriodDay: 'Aujourd\'hui : Jour {day} des règles',
    periodStartsIn: 'Les règles commencent dans {days} {pluralDays}',
    day_one: 'jour',
    day_two: 'jours',
    day_five: 'jours',
    [CycleFlow.Light]: 'Léger',
    [CycleFlow.Medium]: 'Moyen',
    [CycleFlow.Heavy]: 'Abondant',

    // Calendar
    calendar: 'Calendrier',
    prevMonth: 'Mois précédent',
    nextMonth: 'Mois suivant',
    weekDays: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],

    // Calendar Legend
    legendTitle: 'Prédictions :',
    legendPeriod: 'Règles',
    legendFertile: 'Fenêtre fertile',
    legendOvulation: 'Ovulation',
    disclaimer: 'Les prédictions sont des estimations. À utiliser uniquement à des fins informatives.',

    // Mood Summary
    moodSummary: 'Résumé de l\'humeur',
    totalEntries: 'Total des entrées',
    mostCommon: 'Plus fréquent',
    noMood: 'N/A',
    positiveMood: 'Positif',
    neutralMood: 'Neutre',
    negativeMood: 'Négatif',

    // Wellness Tips
    aiWellnessTips: 'Conseils de bien-être',
    getNewTips: 'Obtenir de nouveaux conseils',
    unlockTips: 'Continuez à enregistrer vos humeurs pour débloquer des conseils personnalisés de bien-être !',
    entriesToGo: '{count} entrées restantes.',
    errorGeneratingTips: 'Impossible de générer des conseils pour le moment.',
    wellnessTips: {
      [Mood.Amazing]: [
        "Partagez votre joie avec un ami ou un être cher.",
        "Écrivez dans la section notes exactement ce qui a rendu cette journée formidable pour le voir la prochaine fois que vous vous connecterez.",
        "Utilisez cette énergie pour aborder une tâche que vous repoussez.",
        "Prenez une photo pour capturer ce sentiment.",
        "Répandez la positivité—faites un compliment à quelqu'un.",
        "Réfléchissez à votre gratitude et à ce qui vous apporte du bonheur."
      ],
      [Mood.Good]: [
        "Maintenez l'élan avec une petite habitude productive.",
        "Offrez-vous une collation saine que vous aimez.",
        "Prenez un moment pour apprécier les petites choses.",
        "Faites une courte promenade pour profiter de l'air frais.",
        "Écoutez votre chanson favorite qui remonte le moral.",
        "Planifiez quelque chose d'amusant pour le week-end."
      ],
      [Mood.Okay]: [
        "Prenez une pause de 5 minutes pour vous étirer et respirer.",
        "Buvez un verre d'eau pour vous rafraîchir.",
        "Écoutez un podcast ou de la musique qui vous intéresse.",
        "Rangez une petite zone de votre espace.",
        "Sortez un moment pour la nature.",
        "Lisez un chapitre d'un livre que vous aimez."
      ],
      [Mood.Bad]: [
        "Soyez gentil avec vous-même ; il est normal d'avoir des jours difficiles.",
        "Prenez quelques respirations profondes et lentes pour vous centrer.",
        "Éloignez-vous des écrans pendant 15 minutes.",
        "Faites une petite chose qui vous apporte du confort.",
        "Écrivez une chose pour laquelle vous êtes reconnaissant, aussi petite soit-elle.",
        "Permettez-vous de vous reposer sans culpabilité."
      ],
      [Mood.Terrible]: [
        "Contactez un ami de confiance ou un membre de la famille.",
        "Concentrez-vous sur traverser la prochaine heure.",
        "Enroulez-vous dans une couverture confortable et reposez-vous.",
        "Priorisez le sommeil et l'hydratation aujourd'hui.",
        "Rappelez-vous que les sentiments sont temporaires et que cela passera.",
        "Pratiquez l'autocompassion et la gentillesse."
      ]
    },

    // Share App
    shareApp: 'Partager l\'app avec des amis',
    shareAppMessage: 'Découvrez cette application incroyable pour suivre votre humeur et votre cycle ! Téléchargez Mood & Period Tracker dès aujourd\'hui.',
    shareAppUrl: 'https://play.google.com/store/apps/details?id=com.moodtracker.app',

    // Rate App
    rateUs: 'Évaluez-nous',
    rateUsMessage: 'Nous sommes une petite équipe qui crée cette app avec soin 💜 Si vous l\'appréciez, votre note nous aide vraiment à grandir.',
    rateAppUrl: 'https://play.google.com/store/apps/details?id=com.moodtracker.app',

    // Micro-Diary
    microDiary: 'Micro-journal',
    todaysReflection: 'Réflexion d\'aujourd\'hui',
    reflectionExplanationTitle: 'Exercice de réflexion (quotidiennement, 1–3 minutes)',
    reflectionExplanationText: ' - l\'un des outils les plus puissants pour prendre soin de votre bien-être mental. Noter vos pensées vous aide à voir des schémas, à découvrir ce qui élève votre esprit. Tenir un journal peut soutenir le coping et réduire l\'impact des événements stressants – potentiellement évitant l\'épuisement et l\'anxiété chronique.',
    reflectionLearnMore: 'En savoir plus sur les bienfaits de la tenue d\'un journal',

    // Practices
    practices: 'Pratiques',
    practicesSubtitle: 'Outils doux pour la conscience de l\'humeur et le bien-être',
    dailyReflection: 'Réflexion Quotidienne (Micro-journal)',
    dailyReflectionDesc: 'L\'un des outils les plus puissants pour comprendre et améliorer votre humeur.',
    dailyReflectionTime: '2–3 minutes',
    gratitudePractice: 'Pratique de Gratitude',
    gratitudePracticeDesc: 'Remarquez les petits moments positifs d\'aujourd\'hui.',
    gratitudePracticeTime: '1–2 minutes',
    moodInfluencers: 'Influenceurs d\'Humeur',
    moodInfluencersDesc: 'Identifiez ce qui a influencé votre humeur aujourd\'hui.',
    moodInfluencersTime: '1 minute',
    oneMinuteReset: 'Réinitialisation 1 Minute',
    oneMinuteResetDesc: 'Une pause rapide pour calmer le corps et l\'esprit.',
    oneMinuteResetTime: '1 minute',
    helpfulReading: 'Lecture Utile',
    helpfulReadingDesc: 'Articles courts pour soutenir l\'humeur et les soins personnels.',
    helpfulReadingTime: 'Optionnel',
    backToPractices: 'Retour aux Pratiques',

    reflectionPrompt1: 'Qu\'est-ce qui vous a fait vous sentir bien aujourd\'hui ?',
    reflectionPrompt2: 'Qu\'est-ce qui a drainé votre énergie aujourd\'hui ?',
    reflectionHistory: 'Historique des réflexions',
    noReflections: 'Aucune réflexion pour le moment. Commencez par ajouter votre réflexion d\'aujourd\'hui ci-dessus.',
    reflectionSaved: 'Merci d\'avoir pris un moment pour vous.',
    shortNotesEnough: 'Les notes courtes suffisent 💜',
    exportHistoryAsPDF: 'Exporter l\'historique en PDF',
    exportReflections: 'Exporter les réflexions',
    exportReflections: 'Exporter les réflexions',
    exportAll: 'Tout exporter',
    exportRange: 'Exporter la plage de dates',
    fromDate: 'De',
    toDate: 'À',
    cancel: 'Annuler',
    export: 'Exporter',

    // Delete Account
    deleteAccount: 'Supprimer le compte',
    deleteAccountWarning: 'Cette action ne peut pas être annulée',
    deleteAccountDescription: 'Cela supprimera définitivement votre compte et toutes vos données de suivi d\'humeur, informations sur les périodes et notes. Vous ne pourrez pas récupérer ces données.',
    deleteAccountConfirm: 'Tapez "DELETE" pour confirmer',
    deleteAccountPlaceholder: 'Tapez DELETE ici',
    deleteAccountCancel: 'Annuler',
    deleteAccountDelete: 'Supprimer le compte',
    deleteAccountSuccess: 'Compte supprimé avec succès',
    deleteAccountError: 'Échec de la suppression du compte. Veuillez réessayer ou contacter le support.',

    // Settings
    settingsTitle: 'Paramètres',
    language: 'Langue',
    closeSettings: 'Fermer les paramètres',
    enableCycleTracking: 'Activer le suivi du cycle',
    cycleTrackingDescription: 'Désactivez pour masquer le suivi du cycle et les prédictions dans le calendrier.',
    enableReminders: 'Activer les rappels quotidiens',
    remindersDescription: 'Recevez une notification tous les jours à 20h pour vous rappeler d\'enregistrer votre humeur.',
    remindersDeniedDescription: 'Les permissions de notification sont bloquées. Veuillez les activer dans les paramètres de votre navigateur pour utiliser cette fonction.',
    notificationTitle: 'Comment vous sentez-vous ?',
    notificationBody: "N'oubliez pas d'enregistrer votre humeur dans votre Journal de Bien-être !",

    // Data Management
    dataManagement: 'Gestion des données',
    exportData: 'Exporter les données',
    exportDescription: 'Téléchargez toutes vos entrées et paramètres dans un fichier JSON.',
    importData: 'Importer les données',
    importDescription: 'Importez des données depuis un fichier. Cela écrasera toutes les données actuelles.',
    importWarningMessage: 'Êtes-vous sûr de vouloir importer ce fichier ? Toutes vos données actuelles seront écrasées de manière permanente.',
    importError: 'Erreur lors de l\'importation des données. Assurez-vous que le fichier est un fichier d\'exportation valide et réessayez.',

    // Year View
    yearView: 'Vue annuelle',
    backToDashboard: 'Retour au tableau de bord',

    // Login Page
    loginSubtitle: 'Votre journal personnel de bien-être.',
    emailPlaceholder: 'Adresse e-mail',
    passwordPlaceholder: 'Mot de passe',
    showPasswordAria: 'Afficher le mot de passe',
    hidePasswordAria: 'Masquer le mot de passe',
    signInButton: 'Se connecter',
    signUpButton: 'S\'inscrire',
    processingButton: 'Traitement...',
    noAccountPrompt: "Vous n'avez pas de compte ?",
    haveAccountPrompt: 'Vous avez déjà un compte ?',
    continueAsGuest: 'Continuer en tant qu\'invité',
    errorBothFields: 'Veuillez saisir à la fois l\'email et le mot de passe.',
    errorEmailInUse: 'Cet email est déjà utilisé. Veuillez vous connecter.',
    errorWeakPassword: 'Le mot de passe doit contenir au moins 6 caractères.',
    errorInvalidCredentials: 'Email ou mot de passe invalide.',
    errorUnexpected: 'Une erreur inattendue s\'est produite. Veuillez réessayer.',
    forgotPasswordPrompt: 'Mot de passe oublié ?',
    resetPasswordTitle: 'Réinitialiser le mot de passe',
    resetPasswordInstructions: "Saisissez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.",
    sendResetLinkButton: 'Envoyer le lien de réinitialisation',
    backToLogin: 'Retour à la connexion',
    resetLinkSentSuccess: 'Lien de réinitialisation du mot de passe envoyé ! Vérifiez votre boîte de réception.',
    errorUserNotFound: 'Aucun compte trouvé avec cette adresse email.',
    errorEnterEmail: 'Veuillez saisir votre adresse email.',
  },
  de: {
    // App Header
    title_part1: 'Stimmungs-',
    title_part2_cycle: 'und Zyklus-Tracker',
    title_part3: '',
    subtitle: 'Verfolge deine täglichen Emotionen und entdecke Muster in deinem Wohlbefinden',
    practicesTitle: 'Praktiken',
    yearOverviewTitle: 'Jahresübersicht',
    profileTitle: 'Profil',
    settings: 'Einstellungen öffnen',

    // Daily Affirmation
    affirmationLabel: 'Tagesaffirmation:',
    affirmationLoading: 'Lade deine tägliche Inspiration...',
    affirmationFallback: 'Du hast die Kraft, einen wunderschönen Tag zu erschaffen.',
    affirmations: [
      "Du bist genug, genau so wie du bist.",
      "Heute ist ein Neuanfang voller Möglichkeiten.",
      "Du bist zu erstaunlichen Dingen fähig.",
      "Atme Ruhe ein, atme Stress aus.",
      "Du verdienst Liebe und Respekt.",
      "Dein Potenzial ist grenzenlos.",
      "Kleine Schritte führen zu großen Veränderungen.",
      "Du bist stärker, als du denkst.",
      "Wähle heute Freude.",
      "Deine Gefühle sind gültig und wichtig.",
      "Vertraue dem Timing deines Lebens.",
      "Du bist für dein eigenes Glück verantwortlich.",
      "Umarm die Reise, nicht nur das Ziel.",
      "Du strahlst Positivität und Licht aus.",
      "Jede Herausforderung ist eine Chance zum Wachstum."
    ],

    // Main Interaction Card
    howAreYouFeeling: 'Wie fühlst du dich am {date}?',
    viewingPastEntry: 'Du siehst dir einen früheren Eintrag an.',
    logFutureError: 'Du kannst keine Einträge für zukünftige Daten erstellen.',
    addNotePlaceholder: 'Füge eine kurze Notiz hinzu...',
    addNotePlaceholderFuture: 'Notizen für zukünftige Daten können nicht hinzugefügt werden.',
    saveEntry: 'Eintrag speichern',
    updateEntry: 'Aktualisieren',
    deleteEntry: 'Löschen',
    saveEntryAria: 'Eintrag für {date} speichern',
    updateEntryAria: 'Eintrag für {date} aktualisieren',
    deleteEntryAria: 'Eintrag für {date} löschen',

    // Moods
    [Mood.Amazing]: 'Fantastisch',
    [Mood.Good]: 'Gut',
    [Mood.Okay]: 'Okay',
    [Mood.Bad]: 'Schlecht',
    [Mood.Terrible]: 'Schrecklich',
    selectMood: 'Stimmung auswählen: {mood}',

    // Cycle Tracker
    trackCycle: 'Zyklus verfolgen',
    todayPeriodDay: 'Heute: Tag {day} der Periode',
    periodStartsIn: 'Periode beginnt in {days} {pluralDays}',
    day_one: 'Tag',
    day_two: 'Tagen',
    day_five: 'Tagen',
    [CycleFlow.Light]: 'Leicht',
    [CycleFlow.Medium]: 'Mittel',
    [CycleFlow.Heavy]: 'Stark',

    // Calendar
    calendar: 'Kalender',
    prevMonth: 'Vorheriger Monat',
    nextMonth: 'Nächster Monat',
    weekDays: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],

    // Calendar Legend
    legendTitle: 'Vorhersagen:',
    legendPeriod: 'Periode',
    legendFertile: 'Fruchtbare Phase',
    legendOvulation: 'Eisprung',
    disclaimer: 'Vorhersagen sind Schätzungen. Nur zu Informationszwecken verwenden.',

    // Mood Summary
    moodSummary: 'Stimmungsübersicht',
    totalEntries: 'Gesamt Einträge',
    mostCommon: 'Häufigste',
    noMood: 'N/A',
    positiveMood: 'Positiv',
    neutralMood: 'Neutral',
    negativeMood: 'Negativ',

    // Wellness Tips
    aiWellnessTips: 'Wohlfühl-Tipps',
    getNewTips: 'Neue Tipps erhalten',
    unlockTips: 'Halte deine Stimmungen weiter fest, um personalisierte Wohlfühl-Tipps freizuschalten!',
    entriesToGo: 'Noch {count} Einträge.',
    errorGeneratingTips: 'Tipps konnten momentan nicht generiert werden.',
    wellnessTips: {
      [Mood.Amazing]: [
        "Teile deine Freude mit einem Freund oder einem geliebten Menschen.",
        "Schreibe in die Notizen genau auf, was heute großartig gemacht hat, um es beim nächsten Login zu sehen.",
        "Nutze diese Energie, um eine Aufgabe anzugehen, die du aufschiebst.",
        "Mache ein Foto, um dieses Gefühl festzuhalten.",
        "Verbreite Positivität—mach jemandem ein Kompliment.",
        "Reflektiere über deine Dankbarkeit und was dir Glück bringt."
      ],
      [Mood.Good]: [
        "Halte den Schwung mit einer kleinen produktiven Gewohnheit aufrecht.",
        "Schenke dir einen gesunden Snack, den du magst.",
        "Nimm dir einen Moment, um die kleinen Dinge zu schätzen.",
        "Mache einen kurzen Spaziergang, um die frische Luft zu genießen.",
        "Höre dein Lieblingslied, das gute Laune macht.",
        "Plane etwas Lustiges fürs Wochenende."
      ],
      [Mood.Okay]: [
        "Mache eine 5-minütige Pause zum Dehnen und Atmen.",
        "Trinke ein Glas Wasser, um dich zu erfrischen.",
        "Höre einen Podcast oder Musik, die dich interessiert.",
        "Räume einen kleinen Bereich deines Raumes auf.",
        "Gehe kurz nach draußen für einen Moment in der Natur.",
        "Lies ein Kapitel eines Buches, das du magst."
      ],
      [Mood.Bad]: [
        "Sei sanft zu dir selbst; schlechte Tage sind normal.",
        "Atme einige Male tief und langsam, um dich zu zentrieren.",
        "Entferne dich 15 Minuten von Bildschirmen.",
        "Tue eine kleine Sache, die dir Trost spendet.",
        "Schreibe eine Sache auf, für die du dankbar bist, so klein sie auch sein mag.",
        "Erlaube dir, ohne Schuld zu ruhen."
      ],
      [Mood.Terrible]: [
        "Kontaktiere einen vertrauten Freund oder Familienmitglied.",
        "Konzentriere dich darauf, die nächste Stunde zu überstehen.",
        "Wickle dich in eine kuschelige Decke und ruhe dich aus.",
        "Priorisiere heute Schlaf und Flüssigkeitszufuhr.",
        "Erinnere dich, dass Gefühle vorübergehend sind und dies vorbeigehen wird.",
        "Praktiziere Selbstmitgefühl und Freundlichkeit."
      ]
    },

    // Share App
    shareApp: 'App mit Freunden teilen',
    shareAppMessage: 'Schau dir diese tolle App zum Verfolgen deiner Stimmung und deines Zyklus an! Lade Mood & Period Tracker noch heute herunter.',
    shareAppUrl: 'https://play.google.com/store/apps/details?id=com.moodtracker.app',

    // Rate App
    rateUs: 'Bewerten Sie uns',
    rateUsMessage: 'Wir sind ein kleines Team, das diese App mit Sorgfalt entwickelt 💜 Wenn sie Ihnen gefällt, hilft uns Ihre Bewertung wirklich beim Wachsen.',
    rateAppUrl: 'https://play.google.com/store/apps/details?id=com.moodtracker.app',

    // Micro-Diary
    microDiary: 'Mikro-Tagebuch',
    todaysReflection: 'Heutige Reflexion',
    reflectionExplanationTitle: 'Reflexionsübung (täglich, 1–3 Minuten)',
    reflectionExplanationText: ' - eines der mächtigsten Werkzeuge zur Pflege Ihres psychischen Wohlbefindens. Das Aufschreiben Ihrer Gedanken hilft Ihnen, Muster zu erkennen, herauszufinden, was Ihren Geist hebt. Tagebuch schreiben kann Coping unterstützen und die Auswirkungen von Stressereignissen reduzieren – potenziell Burnout und chronische Angst vermeidend.',
    reflectionLearnMore: 'Erfahren Sie mehr über die Vorteile des Tagebuchschreibens',

    // Practices
    practices: 'Praktiken',
    practicesSubtitle: 'Sanfte Werkzeuge für Stimmungsbewusstsein und Wohlbefinden',
    dailyReflection: 'Tägliche Reflexion (Mikro-Tagebuch)',
    dailyReflectionDesc: 'Eines der mächtigsten Werkzeuge, um Ihre Stimmung zu verstehen und zu verbessern.',
    dailyReflectionTime: '2–3 Minuten',
    gratitudePractice: 'Dankbarkeitsübung',
    gratitudePracticeDesc: 'Beachten Sie kleine positive Momente von heute.',
    gratitudePracticeTime: '1–2 Minuten',
    moodInfluencers: 'Stimmungseinflussfaktoren',
    moodInfluencersDesc: 'Identifizieren Sie, was Ihre Stimmung heute beeinflusst hat.',
    moodInfluencersTime: '1 Minute',
    oneMinuteReset: '1-Minuten-Reset',
    oneMinuteResetDesc: 'Eine kurze Pause, um Körper und Geist zu beruhigen.',
    oneMinuteResetTime: '1 Minute',
    helpfulReading: 'Nützliche Lektüre',
    helpfulReadingDesc: 'Kurze Artikel zur Unterstützung von Stimmung und Selbstfürsorge.',
    helpfulReadingTime: 'Optional',
    backToPractices: 'Zurück zu Praktiken',

    reflectionPrompt1: 'Was hat Sie heute gut fühlen lassen?',
    reflectionPrompt2: 'Was hat Ihre Energie heute erschöpft?',
    reflectionHistory: 'Reflexionshistorie',
    noReflections: 'Noch keine Reflexionen. Beginnen Sie, indem Sie Ihre heutige Reflexion oben hinzufügen.',
    reflectionSaved: 'Danke, dass Sie einen Moment für sich genommen haben.',
    shortNotesEnough: 'Kurze Notizen reichen aus 💜',
    exportHistoryAsPDF: 'Verlauf als PDF exportieren',
    exportReflections: 'Reflexionen exportieren',
    exportAll: 'Alles exportieren',
    exportRange: 'Datumsbereich exportieren',
    fromDate: 'Von',
    toDate: 'Bis',
    cancel: 'Abbrechen',
    export: 'Exportieren',

    // Delete Account
    deleteAccount: 'Konto löschen',
    deleteAccountWarning: 'Diese Aktion kann nicht rückgängig gemacht werden',
    deleteAccountDescription: 'Dies wird Ihr Konto und alle Ihre Stimmungsverfolgungsdaten, Periodeninformationen und Notizen dauerhaft löschen. Sie können diese Daten nicht wiederherstellen.',
    deleteAccountConfirm: 'Geben Sie "DELETE" zur Bestätigung ein',
    deleteAccountPlaceholder: 'Geben Sie DELETE hier ein',
    deleteAccountCancel: 'Abbrechen',
    deleteAccountDelete: 'Konto löschen',
    deleteAccountSuccess: 'Konto erfolgreich gelöscht',
    deleteAccountError: 'Konto konnte nicht gelöscht werden. Bitte versuchen Sie es erneut oder kontaktieren Sie den Support.',

    // Settings
    settingsTitle: 'Einstellungen',
    language: 'Sprache',
    closeSettings: 'Einstellungen schließen',
    enableCycleTracking: 'Zyklus-Tracking aktivieren',
    cycleTrackingDescription: 'Deaktiviere dies, um Zyklus-Tracking und Vorhersagen im Kalender auszublenden.',
    enableReminders: 'Tägliche Erinnerungen aktivieren',
    remindersDescription: 'Erhalte täglich um 20 Uhr eine Benachrichtigung, die dich daran erinnert, deine Stimmung festzuhalten.',
    remindersDeniedDescription: 'Benachrichtigungsberechtigungen sind blockiert. Bitte aktiviere sie in deinen Browser-Einstellungen, um diese Funktion zu verwenden.',
    notificationTitle: 'Wie fühlst du dich?',
    notificationBody: "Vergiss nicht, deine Stimmung in deinem Wohlbefinden-Tagebuch festzuhalten!",

    // Data Management
    dataManagement: 'Datenverwaltung',
    exportData: 'Daten exportieren',
    exportDescription: 'Lade alle deine Einträge und Einstellungen in eine JSON-Datei herunter.',
    importData: 'Daten importieren',
    importDescription: 'Importiere Daten aus einer Datei. Dies überschreibt alle aktuellen Daten.',
    importWarningMessage: 'Bist du sicher, dass du diese Datei importieren möchtest? Alle deine aktuellen Daten werden dauerhaft überschrieben.',
    importError: 'Fehler beim Importieren der Daten. Stelle sicher, dass die Datei eine gültige Exportdatei ist und versuche es erneut.',

    // Year View
    yearView: 'Jahresansicht',
    backToDashboard: 'Zurück zum Dashboard',

    // Login Page
    loginSubtitle: 'Dein persönliches Wohlbefinden-Tagebuch.',
    emailPlaceholder: 'E-Mail-Adresse',
    passwordPlaceholder: 'Passwort',
    showPasswordAria: 'Passwort anzeigen',
    hidePasswordAria: 'Passwort verbergen',
    signInButton: 'Anmelden',
    signUpButton: 'Registrieren',
    processingButton: 'Verarbeite...',
    noAccountPrompt: 'Kein Konto?',
    haveAccountPrompt: 'Hast du bereits ein Konto?',
    continueAsGuest: 'Als Gast fortfahren',
    errorBothFields: 'Bitte gib sowohl E-Mail als auch Passwort ein.',
    errorEmailInUse: 'Diese E-Mail wird bereits verwendet. Bitte melde dich an.',
    errorWeakPassword: 'Das Passwort muss mindestens 6 Zeichen lang sein.',
    errorInvalidCredentials: 'Ungültige E-Mail oder Passwort.',
    errorUnexpected: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.',
    forgotPasswordPrompt: 'Passwort vergessen?',
    resetPasswordTitle: 'Passwort zurücksetzen',
    resetPasswordInstructions: 'Gib deine E-Mail ein und wir senden dir einen Link zum Zurücksetzen deines Passworts.',
    sendResetLinkButton: 'Link zum Zurücksetzen senden',
    backToLogin: 'Zurück zur Anmeldung',
    resetLinkSentSuccess: 'Passwort-Reset-Link gesendet! Überprüfe deinen Posteingang.',
    errorUserNotFound: 'Kein Konto mit dieser E-Mail-Adresse gefunden.',
    errorEnterEmail: 'Bitte gib deine E-Mail-Adresse ein.',
  },
  hi: {
    // App Header
    title_part1: 'मूड और',
    title_part2_cycle: 'मासिक धर्म ट्रैकर',
    title_part3: '',
    subtitle: 'अपनी दैनिक भावनाओं को ट्रैक करें और अपने स्वास्थ्य में पैटर्न खोजें',
    practicesTitle: 'अभ्यास',
    yearOverviewTitle: 'वार्षिक अवलोकन',
    profileTitle: 'प्रोफ़ाइल',
    settings: 'सेटिंग्स खोलें',

    // Daily Affirmation
    affirmationLabel: 'दैनिक पुष्टि:',
    affirmationLoading: 'आपका दैनिक प्रेरणा लोड हो रहा है...',
    affirmationFallback: 'आपके पास एक सुंदर दिन बनाने की शक्ति है।',
    affirmations: [
      "जैसा आप हैं वैसे ही काफी हैं।",
      "आज एक नया शुरुआत है जो अवसरों से भरी है।",
      "आप अद्भुत चीजें कर सकते हैं।",
      "शांति को अंदर खींचें, तनाव को बाहर निकालें।",
      "आप प्यार और सम्मान के हकदार हैं।",
      "आपका क्षमता असीमित है।",
      "छोटे कदम बड़े बदलाव लाते हैं।",
      "आप जितने सोचते हैं उससे ज्यादा मजबूत हैं।",
      "आज खुशी चुनें।",
      "आपकी भावनाएं वैध और महत्वपूर्ण हैं।",
      "अपने जीवन के समय पर विश्वास रखें।",
      "आप अपनी खुद की खुशी के लिए जिम्मेदार हैं।",
      "यात्रा को अपनाएं, सिर्फ मंजिल को नहीं।",
      "आप सकारात्मकता और प्रकाश का उत्सर्जन करते हैं।",
      "हर चुनौती विकास का अवसर है।"
    ],

    // Main Interaction Card
    howAreYouFeeling: '{date} को आप कैसा महसूस कर रहे हैं?',
    viewingPastEntry: 'आप पिछली एंट्री देख रहे हैं।',
    logFutureError: 'आप भविष्य की तारीखों के लिए एंट्री नहीं कर सकते।',
    addNotePlaceholder: 'एक छोटी नोट जोड़ें...',
    addNotePlaceholderFuture: 'भविष्य की तारीखों के लिए नोट नहीं जोड़े जा सकते।',
    saveEntry: 'एंट्री सेव करें',
    updateEntry: 'अपडेट करें',
    deleteEntry: 'डिलीट करें',
    saveEntryAria: '{date} के लिए एंट्री सेव करें',
    updateEntryAria: '{date} के लिए एंट्री अपडेट करें',
    deleteEntryAria: '{date} के लिए एंट्री डिलीट करें',

    // Moods
    [Mood.Amazing]: 'अद्भुत',
    [Mood.Good]: 'अच्छा',
    [Mood.Okay]: 'ठीक',
    [Mood.Bad]: 'खराब',
    [Mood.Terrible]: 'भयानक',
    selectMood: 'मूड चुनें: {mood}',

    // Cycle Tracker
    trackCycle: 'चक्र ट्रैक करें',
    todayPeriodDay: 'आज: पीरियड का दिन {day}',
    periodStartsIn: 'पीरियड शुरू होगा {days} {pluralDays} में',
    day_one: 'दिन',
    day_two: 'दिन',
    day_five: 'दिन',
    [CycleFlow.Light]: 'हल्का',
    [CycleFlow.Medium]: 'मध्यम',
    [CycleFlow.Heavy]: 'भारी',

    // Calendar
    calendar: 'कैलेंडर',
    prevMonth: 'पिछला महीना',
    nextMonth: 'अगला महीना',
    weekDays: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],

    // Calendar Legend
    legendTitle: 'भविष्यवाणियाँ:',
    legendPeriod: 'पीरियड',
    legendFertile: 'उर्वर विंडो',
    legendOvulation: 'ओव्यूलेशन',
    disclaimer: 'भविष्यवाणियाँ अनुमान हैं। केवल सूचना के उद्देश्य के लिए उपयोग करें।',

    // Mood Summary
    moodSummary: 'मूड सारांश',
    totalEntries: 'कुल एंट्री',
    mostCommon: 'सबसे आम',
    noMood: 'N/A',
    positiveMood: 'सकारात्मक',
    neutralMood: 'तटस्थ',
    negativeMood: 'नकारात्मक',

    // Wellness Tips
    aiWellnessTips: 'स्वास्थ्य टिप्स',
    getNewTips: 'नई टिप्स प्राप्त करें',
    unlockTips: 'व्यक्तिगत स्वास्थ्य टिप्स अनलॉक करने के लिए अपने मूड लॉग करना जारी रखें!',
    entriesToGo: '{count} एंट्री और बाकी हैं।',
    errorGeneratingTips: 'इस समय टिप्स जनरेट नहीं कर सके।',
    wellnessTips: {
      [Mood.Amazing]: [
        "अपनी खुशी को एक दोस्त या प्रियजन के साथ साझा करें।",
        "नोट्स सेक्शन में लिखें कि आज क्या इतना शानदार था, अगली बार लॉग इन करने पर देखने के लिए।",
        "जिस टास्क को आप टाल रहे हैं उसे करने के लिए इस एनर्जी का उपयोग करें।",
        "इस फीलिंग को कैप्चर करने के लिए एक फोटो लें।",
        "सकारात्मकता फैलाएं—किसी को कंप्लीमेंट दें।",
        "अपनी ग्रेटिट्यूड पर रिफ्लेक्ट करें और क्या आपको खुशी देता है।"
      ],
      [Mood.Good]: [
        "एक छोटी प्रोडक्टिव हैबिट के साथ मोमेंटम बनाए रखें।",
        "खुद को एक ऐसा हेल्दी स्नैक दें जो आपको पसंद है।",
        "छोटी चीजों को अप्रिशिएट करने के लिए एक मोमेंट लें।",
        "ताजी हवा का मजा लेने के लिए एक छोटा वॉक करें।",
        "अपनी पसंदीदा अपलिफ्टिंग सॉन्ग सुनें।",
        "वीकेंड के लिए कुछ मजेदार प्लान करें।"
      ],
      [Mood.Okay]: [
        "स्ट्रेच और ब्रेथ करने के लिए 5 मिनट की ब्रेक लें।",
        "रिफ्रेश करने के लिए एक गिलास पानी पिएं।",
        "ऐसा पॉडकास्ट या म्यूजिक सुनें जो आपको इंटरेस्ट करता है।",
        "अपने स्पेस का एक छोटा एरिया टाइड करें।",
        "नेचर के एक मोमेंट के लिए बाहर जाएं।",
        "जिस बुक को आप लाइक करते हैं उसका एक चैप्टर पढ़ें।"
      ],
      [Mood.Bad]: [
        "अपने साथ सॉफ्ट रहें; बुरे दिन होना सामान्य है।",
        "सेन्टर करने के लिए कुछ डीप, स्लो ब्रेथ्स लें।",
        "15 मिनट के लिए स्क्रीन्स से दूर रहें।",
        "वह छोटी चीज करें जो आपको कम्फर्ट देती है।",
        "एक चीज लिखें जिसके लिए आप ग्रेटफुल हैं, चाहे कितनी भी छोटी क्यों न हो।",
        "गिल्ट के बिना रेस्ट करने की परमिशन दें।"
      ],
      [Mood.Terrible]: [
        "एक ट्रस्टेड फ्रेंड या फैमिली मेंबर से संपर्क करें।",
        "नेक्स्ट आवर को पार करने पर फोकस करें।",
        "एक कोज़ी ब्लैंकेट में रैप करें और रेस्ट करें।",
        "आज स्लीप और हाइड्रेशन को प्रायोरिटी दें।",
        "रिमेम्बर करें कि फीलिंग्स टेम्पररी हैं और यह पास हो जाएगा।",
        "सेल्फ-कंपेशन और काइंडनेस प्रैक्टिस करें।"
      ]
    },

    // Share App
    shareApp: 'दोस्तों के साथ ऐप शेयर करें',
    shareAppMessage: 'अपने मूड और चक्र को ट्रैक करने के लिए इस शानदार ऐप को देखें! आज ही Mood & Period Tracker डाउनलोड करें।',
    shareAppUrl: 'https://play.google.com/store/apps/details?id=com.moodtracker.app',

    // Rate App
    rateUs: 'हमें रेट करें',
    rateUsMessage: 'हम एक छोटी टीम हैं जो इस ऐप को ध्यान से बना रही है 💜 अगर आप इसका आनंद ले रहे हैं, तो आपकी रेटिंग हमें बढ़ने में वास्तव में मदद करती है।',
    rateAppUrl: 'https://play.google.com/store/apps/details?id=com.moodtracker.app',

    // Micro-Diary
    microDiary: 'माइक्रो-डायरी',
    todaysReflection: 'आज की प्रतिबिंब',
    reflectionExplanationTitle: 'प्रतिबिंब अभ्यास (दैनिक, 1–3 मिनट)',
    reflectionExplanationText: ' - आपके मानसिक स्वास्थ्य की देखभाल के लिए सबसे शक्तिशाली उपकरणों में से एक। अपने विचारों को नोट करना आपको पैटर्न देखने, पता लगाने में मदद करता है कि क्या आपके मनोभाव को बढ़ाता है। जर्नलिंग coping का समर्थन कर सकता है और तनावपूर्ण घटनाओं के प्रभाव को कम कर सकता है – संभावित रूप से बर्नआउट और पुरानी चिंता से बचने के लिए।',
    reflectionLearnMore: 'जर्नलिंग के लाभों के बारे में और जानें',

    // Practices
    practices: 'अभ्यास',
    practicesSubtitle: 'मूड जागरूकता और भलाई के लिए कोमल उपकरण',
    dailyReflection: 'दैनिक प्रतिबिंब (माइक्रो-डायरी)',
    dailyReflectionDesc: 'आपके मूड को समझने और सुधारने के लिए सबसे शक्तिशाली उपकरणों में से एक।',
    dailyReflectionTime: '2–3 मिनट',
    gratitudePractice: 'कृतज्ञता अभ्यास',
    gratitudePracticeDesc: 'आज के छोटे सकारात्मक क्षणों पर ध्यान दें।',
    gratitudePracticeTime: '1–2 मिनट',
    moodInfluencers: 'मूड प्रभावकारक',
    moodInfluencersDesc: 'पहचानें कि आज क्या आपके मूड को प्रभावित किया।',
    moodInfluencersTime: '1 मिनट',
    oneMinuteReset: '1-मिनट रीसेट',
    oneMinuteResetDesc: 'शरीर और मन को शांत करने के लिए एक त्वरित विराम।',
    oneMinuteResetTime: '1 मिनट',
    helpfulReading: 'सहायक पढ़ना',
    helpfulReadingDesc: 'मूड और आत्म-देखभाल का समर्थन करने के लिए छोटे लेख।',
    helpfulReadingTime: 'वैकल्पिक',
    backToPractices: 'अभ्यासों पर वापस जाएं',

    reflectionPrompt1: 'आज क्या आपको अच्छा महसूस करवाया?',
    reflectionPrompt2: 'आज क्या आपकी ऊर्जा कम कर दी?',
    reflectionHistory: 'प्रतिबिंब इतिहास',
    noReflections: 'अभी तक कोई प्रतिबिंब नहीं। ऊपर आज का प्रतिबिंब जोड़कर शुरू करें।',
    reflectionSaved: 'खुद के लिए एक पल निकालने के लिए धन्यवाद।',
    shortNotesEnough: 'छोटी नोट्स काफी हैं 💜',
    exportHistoryAsPDF: 'इतिहास को PDF के रूप में निर्यात करें',
    exportReflections: 'प्रतिबिंब निर्यात करें',
    exportAll: 'सभी निर्यात करें',
    exportRange: 'दिनांक सीमा निर्यात करें',
    fromDate: 'से',
    toDate: 'तक',
    cancel: 'रद्द करें',
    export: 'निर्यात',

    // Delete Account
    deleteAccount: 'खाता हटाएं',
    deleteAccountWarning: 'यह कार्य पूर्ववत नहीं किया जा सकता',
    deleteAccountDescription: 'यह आपके खाते और आपके सभी मूड ट्रैकिंग डेटा, अवधि जानकारी और नोट्स को स्थायी रूप से हटा देगा। आप इन डेटा को पुनर्प्राप्त नहीं कर पाएंगे।',
    deleteAccountConfirm: 'पुष्टि करने के लिए "DELETE" टाइप करें',
    deleteAccountPlaceholder: 'यहां DELETE टाइप करें',
    deleteAccountCancel: 'रद्द करें',
    deleteAccountDelete: 'खाता हटाएं',
    deleteAccountSuccess: 'खाता सफलतापूर्वक हटा दिया गया',
    deleteAccountError: 'खाता हटाने में विफल। कृपया फिर से प्रयास करें या सहायता से संपर्क करें।',

    // Settings
    settingsTitle: 'सेटिंग्स',
    language: 'भाषा',
    closeSettings: 'सेटिंग्स बंद करें',
    enableCycleTracking: 'साइकल ट्रैकिंग इनेबल करें',
    cycleTrackingDescription: 'कैलेंडर में साइकल ट्रैकिंग और प्रेडिक्शन्स को हाइड करने के लिए इसे डिसेबल करें।',
    enableReminders: 'दैनिक रिमाइंडर्स इनेबल करें',
    remindersDescription: 'अपना मूड लॉग करने के लिए याद दिलाने के लिए हर दिन शाम 8 बजे नोटिफिकेशन प्राप्त करें।',
    remindersDeniedDescription: 'नोटिफिकेशन परमिशन्स ब्लॉक हैं। इस फीचर का उपयोग करने के लिए अपने ब्राउज़र की सेटिंग्स में उन्हें इनेबल करें।',
    notificationTitle: 'आप कैसे महसूस कर रहे हैं?',
    notificationBody: "अपना मूड अपने वेलनेस डायरी में लॉग करना न भूलें!",

    // Data Management
    dataManagement: 'डेटा मैनेजमेंट',
    exportData: 'डेटा एक्सपोर्ट करें',
    exportDescription: 'सभी एंट्री और सेटिंग्स को JSON फाइल में डाउनलोड करें।',
    importData: 'डेटा इंपोर्ट करें',
    importDescription: 'फाइल से डेटा इंपोर्ट करें। यह सभी करंट डेटा को ओवरराइट कर देगा।',
    importWarningMessage: 'क्या आप वाकई इस फाइल को इंपोर्ट करना चाहते हैं? आपका सारा करंट डेटा परमानेंटली ओवरराइट हो जाएगा।',
    importError: 'डेटा इंपोर्ट करने में एरर। एश्योर करें कि फाइल एक वैलिड एक्सपोर्ट फाइल है और फिर से ट्राई करें।',

    // Year View
    yearView: 'वार्षिक दृश्य',
    backToDashboard: 'डैशबोर्ड पर वापस जाएं',

    // Login Page
    loginSubtitle: 'आपका व्यक्तिगत स्वास्थ्य डायरी।',
    emailPlaceholder: 'ईमेल एड्रेस',
    passwordPlaceholder: 'पासवर्ड',
    showPasswordAria: 'पासवर्ड दिखाएं',
    hidePasswordAria: 'पासवर्ड छुपाएं',
    signInButton: 'साइन इन',
    signUpButton: 'साइन अप',
    processingButton: 'प्रोसेसिंग...',
    noAccountPrompt: 'खाता नहीं है?',
    haveAccountPrompt: 'पहले से खाता है?',
    continueAsGuest: 'गेस्ट के रूप में जारी रखें',
    errorBothFields: 'कृपया ईमेल और पासवर्ड दोनों दर्ज करें।',
    errorEmailInUse: 'यह ईमेल पहले से उपयोग में है। कृपया साइन इन करें।',
    errorWeakPassword: 'पासवर्ड कम से कम 6 कैरेक्टर्स का होना चाहिए।',
    errorInvalidCredentials: 'अवैध ईमेल या पासवर्ड।',
    errorUnexpected: 'एक अनपेक्षित एरर हुई। कृपया फिर से ट्राई करें।',
    forgotPasswordPrompt: 'पासवर्ड भूल गए?',
    resetPasswordTitle: 'पासवर्ड रीसेट करें',
    resetPasswordInstructions: 'अपना ईमेल दर्ज करें और हम आपको अपना पासवर्ड रीसेट करने के लिए एक लिंक भेजेंगे।',
    sendResetLinkButton: 'रीसेट लिंक भेजें',
    backToLogin: 'लॉगिन पर वापस जाएं',
    resetLinkSentSuccess: 'पासवर्ड रीसेट लिंक भेजा गया! अपना इनबॉक्स चेक करें।',
    errorUserNotFound: 'इस ईमेल एड्रेस से कोई खाता नहीं मिला।',
    errorEnterEmail: 'कृपया अपना ईमेल एड्रेस दर्ज करें।',
  },
  id: {
    // App Header
    title_part1: 'Pelacak',
    title_part2_cycle: 'Suasana Hati dan Siklus',
    title_part3: '',
    subtitle: 'Lacak emosi harian Anda dan temukan pola dalam kesehatan Anda',
    practicesTitle: 'Praktik',
    yearOverviewTitle: 'Ikhtisar Tahunan',
    profileTitle: 'Profil',
    settings: 'Buka pengaturan',

    // Daily Affirmation
    affirmationLabel: 'Afirmasi harian:',
    affirmationLoading: 'Memuat inspirasi harian Anda...',
    affirmationFallback: 'Anda memiliki kekuatan untuk menciptakan hari yang indah.',
    affirmations: [
      "Anda cukup apa adanya.",
      "Hari ini adalah awal baru yang penuh peluang.",
      "Anda mampu melakukan hal-hal luar biasa.",
      "Tarik napas tenang, hembuskan stres.",
      "Anda layak mendapatkan cinta dan penghargaan.",
      "Potensi Anda tak terbatas.",
      "Langkah kecil membawa perubahan besar.",
      "Anda lebih kuat dari yang Anda pikirkan.",
      "Pilih kegembiraan hari ini.",
      "Perasaan Anda valid dan penting.",
      "Percayalah pada waktu hidup Anda.",
      "Anda bertanggung jawab atas kebahagiaan Anda sendiri.",
      "Peluk perjalanan, bukan hanya tujuan.",
      "Anda memancarkan positivit dan cahaya.",
      "Setiap tantangan adalah kesempatan untuk tumbuh."
    ],

    // Main Interaction Card
    howAreYouFeeling: 'Bagaimana perasaan Anda pada {date}?',
    viewingPastEntry: 'Anda sedang melihat entri sebelumnya.',
    logFutureError: 'Anda tidak dapat mencatat entri untuk tanggal di masa depan.',
    addNotePlaceholder: 'Tambahkan catatan singkat...',
    addNotePlaceholderFuture: 'Tidak dapat menambahkan catatan untuk tanggal di masa depan.',
    saveEntry: 'Simpan Entri',
    updateEntry: 'Perbarui',
    deleteEntry: 'Hapus',
    saveEntryAria: 'Simpan entri untuk {date}',
    updateEntryAria: 'Perbarui entri untuk {date}',
    deleteEntryAria: 'Hapus entri untuk {date}',

    // Moods
    [Mood.Amazing]: 'Luar Biasa',
    [Mood.Good]: 'Baik',
    [Mood.Okay]: 'Biasa Saja',
    [Mood.Bad]: 'Buruk',
    [Mood.Terrible]: 'Sangat Buruk',
    selectMood: 'Pilih suasana hati: {mood}',

    // Cycle Tracker
    trackCycle: 'Lacak siklus',
    todayPeriodDay: 'Hari ini: Hari {day} haid',
    periodStartsIn: 'Haid dimulai dalam {days} {pluralDays}',
    day_one: 'hari',
    day_two: 'hari',
    day_five: 'hari',
    [CycleFlow.Light]: 'Ringan',
    [CycleFlow.Medium]: 'Sedang',
    [CycleFlow.Heavy]: 'Lebat',

    // Calendar
    calendar: 'Kalender',
    prevMonth: 'Bulan sebelumnya',
    nextMonth: 'Bulan berikutnya',
    weekDays: ['M', 'S', 'S', 'R', 'K', 'J', 'S'],

    // Calendar Legend
    legendTitle: 'Prediksi:',
    legendPeriod: 'Haid',
    legendFertile: 'Jendela Fertilitas',
    legendOvulation: 'Ovulas',
    disclaimer: 'Prediksi adalah perkiraan. Gunakan hanya untuk tujuan informasi.',

    // Mood Summary
    moodSummary: 'Ringkasan Suasana Hati',
    totalEntries: 'Total Entri',
    mostCommon: 'Paling Umum',
    noMood: 'N/A',
    positiveMood: 'Positif',
    neutralMood: 'Netral',
    negativeMood: 'Negatif',

    // Wellness Tips
    aiWellnessTips: 'Tips Kesehatan',
    getNewTips: 'Dapatkan Tips Baru',
    unlockTips: 'Terus catat suasana hati Anda untuk membuka tips kesehatan yang dipersonalisasi!',
    entriesToGo: '{count} entri lagi.',
    errorGeneratingTips: 'Tidak dapat menghasilkan tips saat ini.',
    wellnessTips: {
      [Mood.Amazing]: [
        "Bagikan kegembiraan Anda dengan teman atau orang yang Anda cintai.",
        "Tuliskan di bagian catatan persis apa yang membuat hari ini luar biasa, untuk dilihat saat login berikutnya.",
        "Gunakan energi ini untuk menangani tugas yang Anda tunda.",
        "Ambil foto untuk menangkap perasaan ini.",
        "Sebarkan positivit—berikan pujian kepada seseorang.",
        "Renungkan tentang rasa syukur Anda dan apa yang membawa kebahagiaan."
      ],
      [Mood.Good]: [
        "Pertahankan momentum dengan kebiasaan produktif kecil.",
        "Berikanlah camilan sehat yang Anda sukai.",
        "Luangkan waktu sejenak untuk menghargai hal-hal kecil.",
        "Jalan-jalan singkat untuk menikmati udara segar.",
        "Dengarkan lagu favorit Anda yang mengangkat semangat.",
        "Rencanakan sesuatu yang menyenangkan untuk akhir pekan."
      ],
      [Mood.Okay]: [
        "Ambil istirahat 5 menit untuk meregangkan dan bernapas.",
        "Minum segelas air untuk menyegarkan diri.",
        "Dengarkan podcast atau musik yang Anda minati.",
        "Rapihkan area kecil di ruang Anda.",
        "Keluar sejenak untuk momen di alam.",
        "Baca satu bab dari buku yang Anda sukai."
      ],
      [Mood.Bad]: [
        "Bersikaplah lembut pada diri sendiri; memiliki hari buruk adalah normal.",
        "Ambil beberapa napas dalam dan lambat untuk menenangkan diri.",
        "Menjauh dari layar selama 15 menit.",
        "Lakukan hal kecil yang memberikan kenyamanan.",
        "Tuliskan satu hal yang Anda syukuri, seberapa kecil pun.",
        "Izinkan diri Anda beristirahat tanpa rasa bersalah."
      ],
      [Mood.Terrible]: [
        "Hubungi teman tepercaya atau anggota keluarga.",
        "Fokuslah untuk melewati jam berikutnya.",
        "Bungkus diri dengan selimut yang nyaman dan beristirahat.",
        "Prioritaskan tidur dan hidrasi hari ini.",
        "Ingat bahwa perasaan bersifat sementara dan ini akan berlalu.",
        "Praktikkan belas kasih diri dan kebaikan."
      ]
    },

    // Share App
    shareApp: 'Bagikan app dengan teman',
    shareAppMessage: 'Lihat aplikasi luar biasa ini untuk melacak suasana hati dan siklus Anda! Unduh Mood & Period Tracker hari ini.',
    shareAppUrl: 'https://play.google.com/store/apps/details?id=com.moodtracker.app',

    // Rate App
    rateUs: 'Beri rating kami',
    rateAppUrl: 'https://play.google.com/store/apps/details?id=com.moodtracker.app',

    // Micro-Diary
    microDiary: 'Mikro-Diary',
    todaysReflection: 'Refleksi Hari Ini',
    reflectionExplanationTitle: 'Latihan refleksi (harian, 1–3 menit)',
    reflectionExplanationText: ' - salah satu alat paling kuat untuk merawat kesejahteraan mental Anda. Mencatat pikiran Anda membantu Anda melihat pola, menemukan apa yang meningkatkan semangat Anda. Menulis jurnal dapat mendukung coping dan mengurangi dampak peristiwa stres – berpotensi menghindari burnout dan kecemasan kronis.',
    reflectionLearnMore: 'Pelajari lebih lanjut tentang manfaat journaling',

    // Practices
    practices: 'Praktik',
    practicesSubtitle: 'Alat lembut untuk kesadaran suasana hati dan kesejahteraan',
    dailyReflection: 'Refleksi Harian (Mikro-Diary)',
    dailyReflectionDesc: 'Salah satu alat paling kuat untuk memahami dan meningkatkan suasana hati Anda.',
    dailyReflectionTime: '2–3 menit',
    gratitudePractice: 'Praktik Kesyukuran',
    gratitudePracticeDesc: 'Perhatikan momen positif kecil dari hari ini.',
    gratitudePracticeTime: '1–2 menit',
    moodInfluencers: 'Pengaruh Suasana Hati',
    moodInfluencersDesc: 'Identifikasi apa yang memengaruhi suasana hati Anda hari ini.',
    moodInfluencersTime: '1 menit',
    oneMinuteReset: 'Reset 1 Menit',
    oneMinuteResetDesc: 'Jeda cepat untuk menenangkan tubuh dan pikiran.',
    oneMinuteResetTime: '1 menit',
    helpfulReading: 'Bacaan Bermanfaat',
    helpfulReadingDesc: 'Artikel pendek untuk mendukung suasana hati dan perawatan diri.',
    helpfulReadingTime: 'Opsional',
    backToPractices: 'Kembali ke Praktik',

    reflectionPrompt1: 'Apa yang membuat Anda merasa baik hari ini?',
    reflectionPrompt2: 'Apa yang menghabiskan energi Anda hari ini?',
    reflectionHistory: 'Riwayat Refleksi',
    noReflections: 'Belum ada refleksi. Mulai dengan menambahkan refleksi hari ini di atas.',
    reflectionSaved: 'Terima kasih telah meluangkan waktu untuk diri sendiri.',
    shortNotesEnough: 'Catatan singkat sudah cukup 💜',
    exportHistoryAsPDF: 'Ekspor Riwayat sebagai PDF',
    exportReflections: 'Ekspor Refleksi',
    exportAll: 'Ekspor Semua',
    exportRange: 'Ekspor Rentang Tanggal',
    fromDate: 'Dari',
    toDate: 'Sampai',
    cancel: 'Batal',
    export: 'Ekspor',

    // Delete Account
    deleteAccount: 'Hapus akun',
    deleteAccountWarning: 'Tindakan ini tidak dapat dibatalkan',
    deleteAccountDescription: 'Ini akan menghapus akun Anda dan semua data pelacakan suasana hati, informasi periode, dan catatan secara permanen. Anda tidak akan dapat memulihkan data ini.',
    deleteAccountConfirm: 'Ketik "DELETE" untuk konfirmasi',
    deleteAccountPlaceholder: 'Ketik DELETE di sini',
    deleteAccountCancel: 'Batal',
    deleteAccountDelete: 'Hapus akun',
    deleteAccountSuccess: 'Akun berhasil dihapus',
    deleteAccountError: 'Gagal menghapus akun. Silakan coba lagi atau hubungi dukungan.',

    // Settings
    settingsTitle: 'Pengaturan',
    language: 'Bahasa',
    closeSettings: 'Tutup pengaturan',
    enableCycleTracking: 'Aktifkan Pelacakan Siklus',
    cycleTrackingDescription: 'Nonaktifkan untuk menyembunyikan pelacakan siklus dan prediksi di kalender.',
    enableReminders: 'Aktifkan Pengingat Harian',
    remindersDescription: 'Terima notifikasi setiap hari pukul 20.00 untuk mengingatkan Anda mencatat suasana hati.',
    remindersDeniedDescription: 'Izin notifikasi diblokir. Harap aktifkan di pengaturan browser Anda untuk menggunakan fitur ini.',
    notificationTitle: 'Bagaimana perasaan Anda?',
    notificationBody: "Jangan lupa mencatat suasana hati Anda di Jurnal Kesehatan!",

    // Data Management
    dataManagement: 'Manajemen Data',
    exportData: 'Ekspor Data',
    exportDescription: 'Unduh semua entri dan pengaturan Anda ke file JSON.',
    importData: 'Impor Data',
    importDescription: 'Impor data dari file. Ini akan menimpa semua data saat ini.',
    importWarningMessage: 'Apakah Anda yakin ingin mengimpor file ini? Semua data Anda saat ini akan ditimpa secara permanen.',
    importError: 'Kesalahan saat mengimpor data. Pastikan file adalah file ekspor yang valid dan coba lagi.',

    // Year View
    yearView: 'Tampilan Tahunan',
    backToDashboard: 'Kembali ke Dasbor',

    // Login Page
    loginSubtitle: 'Jurnal kesehatan pribadi Anda.',
    emailPlaceholder: 'Alamat email',
    passwordPlaceholder: 'Kata sandi',
    showPasswordAria: 'Tampilkan kata sandi',
    hidePasswordAria: 'Sembunyikan kata sandi',
    signInButton: 'Masuk',
    signUpButton: 'Daftar',
    processingButton: 'Memproses...',
    noAccountPrompt: 'Tidak punya akun?',
    haveAccountPrompt: 'Sudah punya akun?',
    continueAsGuest: 'Lanjutkan sebagai Tamu',
    errorBothFields: 'Harap masukkan email dan kata sandi.',
    errorEmailInUse: 'Email ini sudah digunakan. Harap masuk.',
    errorWeakPassword: 'Kata sandi harus minimal 6 karakter.',
    errorInvalidCredentials: 'Email atau kata sandi tidak valid.',
    errorUnexpected: 'Terjadi kesalahan tak terduga. Harap coba lagi.',
    forgotPasswordPrompt: 'Lupa Kata Sandi?',
    resetPasswordTitle: 'Atur Ulang Kata Sandi',
    resetPasswordInstructions: 'Masukkan email Anda dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi Anda.',
    sendResetLinkButton: 'Kirim Tautan Atur Ulang',
    backToLogin: 'Kembali ke Masuk',
    resetLinkSentSuccess: 'Tautan atur ulang kata sandi dikirim! Periksa kotak masuk Anda.',
    errorUserNotFound: 'Tidak ada akun yang ditemukan dengan alamat email ini.',
    errorEnterEmail: 'Harap masukkan alamat email Anda.',
  },
  tr: {
    // App Header
    title_part1: 'Ruh Hali ve',
    title_part2_cycle: 'Döngü Takipçisi',
    title_part3: '',
    subtitle: 'Günlük duygularınızı takip edin ve sağlık yolculuğunuzda kalıplar keşfedin',
    practicesTitle: 'Pratikler',
    yearOverviewTitle: 'Yıllık Genel Bakış',
    profileTitle: 'Profil',
    settings: 'Ayarları aç',

    // Daily Affirmation
    affirmationLabel: 'Günlük onaylama:',
    affirmationLoading: 'Günlük ilhamınız yükleniyor...',
    affirmationFallback: 'Güzel bir gün yaratma gücüne sahipsiniz.',
    affirmations: [
      "Olduğunuz gibi yeterlisiniz.",
      "Bugün fırsatlarla dolu yeni bir başlangıç.",
      "İnanılmaz şeyler yapma kapasitesine sahipsiniz.",
      "Sakinliği içine çek, stresi dışarı ver.",
      "Sevgi ve saygıyı hak ediyorsunuz.",
      "Potansiyeliniz sınırsız.",
      "Küçük adımlar büyük değişikliklere yol açar.",
      "Düşündüğünüzden daha güçlüsünüz.",
      "Bugün neşeyi seçin.",
      "Duygularınız geçerli ve önemlidir.",
      "Hayatınızın zamanlamasına güvenin.",
      "Kendi mutluluğunuzdan siz sorumlusunuz.",
      "Yolculuğu kucaklayın, sadece hedefi değil.",
      "Pozitivite ve ışık yayarsınız.",
      "Her zorluk büyüme fırsatıdır."
    ],

    // Main Interaction Card
    howAreYouFeeling: '{date} tarihinde nasıl hissediyorsunuz?',
    viewingPastEntry: 'Önceki bir girişi görüntülüyorsunuz.',
    logFutureError: 'Gelecek tarihler için giriş kaydedemezsiniz.',
    addNotePlaceholder: 'Kısa bir not ekleyin...',
    addNotePlaceholderFuture: 'Gelecek tarihler için not eklenemez.',
    saveEntry: 'Girişi Kaydet',
    updateEntry: 'Güncelle',
    deleteEntry: 'Sil',
    saveEntryAria: '{date} için giriş kaydet',
    updateEntryAria: '{date} için giriş güncelle',
    deleteEntryAria: '{date} için giriş sil',

    // Moods
    [Mood.Amazing]: 'Harika',
    [Mood.Good]: 'İyi',
    [Mood.Okay]: 'Fena Değil',
    [Mood.Bad]: 'Kötü',
    [Mood.Terrible]: 'Korkunç',
    selectMood: 'Ruh halini seç: {mood}',

    // Cycle Tracker
    trackCycle: 'Döngüyü takip et',
    todayPeriodDay: 'Bugün: Âdet günü {day}',
    periodStartsIn: 'Âdet {days} {pluralDays} içinde başlar',
    day_one: 'gün',
    day_two: 'gün',
    day_five: 'gün',
    [CycleFlow.Light]: 'Hafif',
    [CycleFlow.Medium]: 'Orta',
    [CycleFlow.Heavy]: 'Şiddetli',

    // Calendar
    calendar: 'Takvim',
    prevMonth: 'Önceki ay',
    nextMonth: 'Sonraki ay',
    weekDays: ['P', 'P', 'S', 'Ç', 'P', 'C', 'C'],

    // Calendar Legend
    legendTitle: 'Tahminler:',
    legendPeriod: 'Âdet',
    legendFertile: 'Verimli Pencere',
    legendOvulation: 'Yumurtlama',
    disclaimer: 'Tahminler tahminidir. Sadece bilgilendirme amaçlı kullanın.',

    // Mood Summary
    moodSummary: 'Ruh Hali Özeti',
    totalEntries: 'Toplam Giriş',
    mostCommon: 'En Yaygın',
    noMood: 'N/A',
    positiveMood: 'Pozitif',
    neutralMood: 'Nötr',
    negativeMood: 'Negatif',

    // Wellness Tips
    aiWellnessTips: 'İyilik İpuçları',
    getNewTips: 'Yeni İpuçları Al',
    unlockTips: 'Kişiselleştirilmiş iyilik ipuçlarını açmak için ruh halinizi kaydetmeye devam edin!',
    entriesToGo: '{count} giriş kaldı.',
    errorGeneratingTips: 'Şu anda ipuçları oluşturulamadı.',
    wellnessTips: {
      [Mood.Amazing]: [
        "Neşenizi bir arkadaşınızla veya sevdiklerinizle paylaşın.",
        "Notlar bölümüne bugün neyi bu kadar harika kıldığını yazın, bir sonraki girişinizde görmek için.",
        "Ertelediğiniz bir görevi ele almak için bu enerjiyi kullanın.",
        "Bu duyguyu yakalamak için bir fotoğraf çekin.",
        "Pozitiviteyi yay—birine iltifat et.",
        "Şükran duygunuz üzerinde düşünün ve size neşe veren şey."
      ],
      [Mood.Good]: [
        "Küçük bir üretken alışkanlıkla ivmeyi sürdürün.",
        "Sevdiğiniz sağlıklı bir atıştırmalık hediye edin.",
        "Küçük şeyleri takdir etmek için bir an ayırın.",
        "Taze havanın tadını çıkarmak için kısa bir yürüyüş yapın.",
        "Ruh halinizi yükselten favori şarkınızı dinleyin.",
        "Hafta sonu için eğlenceli bir şey planlayın."
      ],
      [Mood.Okay]: [
        "Esneme ve nefes almak için 5 dakikalık bir mola verin.",
        "Kendinizi yenilemek için bir bardak su için.",
        "İlginizi çeken bir podcast veya müzik dinleyin.",
        "Alanınızın küçük bir bölümünü düzenleyin.",
        "Doğada bir an için dışarı çıkın.",
        "Sevdiğiniz bir kitaptan bir bölüm okuyun."
      ],
      [Mood.Bad]: [
        "Kendinize karşı yumuşak olun; kötü günler normaldir.",
        "Kendinizi merkezlemek için birkaç derin, yavaş nefes alın.",
        "15 dakika boyunca ekranlardan uzak durun.",
        "Size rahatlık veren küçük bir şey yapın.",
        "Ne kadar küçük olursa olsun, şükran duyduğunuz bir şeyi yazın.",
        "Suçluluk duymadan dinlenmenize izin verin."
      ],
      [Mood.Terrible]: [
        "Güvendiğiniz bir arkadaşla veya aile üyesiyle iletişime geçin.",
        "Sonraki saati atlatmaya odaklanın.",
        "Rahat bir battaniyeye sarının ve dinlenin.",
        "Bugün uyku ve hidrasyonu önceliklendirin.",
        "Duyguların geçici olduğunu ve bunun geçeceğini hatırlayın.",
        "Kendine şefkat ve nezaket uygulayın."
      ]
    },

    // Share App
    shareApp: 'Arkadaşlarınla uygulamayı paylaş',
    shareAppMessage: 'Ruh halinizi ve döngünüzü takip etmek için bu harika uygulamaya göz atın! Mood & Period Tracker\'ı bugün indirin.',
    shareAppUrl: 'https://play.google.com/store/apps/details?id=com.moodtracker.app',

    // Rate App
    rateUs: 'Bizi oyla',
    rateAppUrl: 'https://play.google.com/store/apps/details?id=com.moodtracker.app',

    // Micro-Diary
    microDiary: 'Mikro-Günlük',
    todaysReflection: 'Bugünkü Yansıma',
    reflectionExplanationTitle: 'Yansıma egzersizi (günlük, 1–3 dakika)',
    reflectionExplanationText: ' - zihinsel sağlığınızı korumak için en güçlü araçlardan biridir. Düşüncelerinizi not almak, kalıpları görmenize, ruh halinizi yükselten şeyleri keşfetmenize yardımcı olur. Günlük tutmak başa çıkmayı destekleyebilir ve stresli olayların etkisini azaltabilir – potansiyel olarak tükenmişlik ve kronik anksiyeteden kaçınarak.',
    reflectionLearnMore: 'Günlük tutmanın faydaları hakkında daha fazla bilgi edinin',

    // Practices
    practices: 'Pratikler',
    practicesSubtitle: 'Ruh hali farkındalığı ve iyi oluş için nazik araçlar',
    dailyReflection: 'Günlük Yansıma (Mikro-Günlük)',
    dailyReflectionDesc: 'Ruh halinizi anlamak ve geliştirmek için en güçlü araçlardan biri.',
    dailyReflectionTime: '2–3 dakika',
    gratitudePractice: 'Şükran Uygulaması',
    gratitudePracticeDesc: 'Bugünden küçük olumlu anları fark edin.',
    gratitudePracticeTime: '1–2 dakika',
    moodInfluencers: 'Ruh Hali Etkileyicileri',
    moodInfluencersDesc: 'Bugün ruh halinizi neyin etkilediğini belirleyin.',
    moodInfluencersTime: '1 dakika',
    oneMinuteReset: '1 Dakikalık Sıfırlama',
    oneMinuteResetDesc: 'Vücut ve zihni sakinleştirmek için hızlı bir mola.',
    oneMinuteResetTime: '1 dakika',
    helpfulReading: 'Yararlı Okuma',
    helpfulReadingDesc: 'Ruh hali ve öz bakımı desteklemek için kısa makaleler.',
    helpfulReadingTime: 'İsteğe bağlı',
    backToPractices: 'Pratiklere Dön',

    reflectionPrompt1: 'Bugün sizi iyi hissettiren şey neydi?',
    reflectionPrompt2: 'Bugün enerjinizi tüketen şey neydi?',
    reflectionHistory: 'Yansıma Geçmişi',
    noReflections: 'Henüz yansıma yok. Yukarıda bugünkü yansımayı ekleyerek başlayın.',
    reflectionSaved: 'Kendinize zaman ayırdığınız için teşekkür ederiz.',
    shortNotesEnough: 'Kısa notlar yeterli 💜',
    exportHistoryAsPDF: 'Geçmişi PDF olarak dışa aktar',
    exportReflections: 'Yansımaları dışa aktar',
    exportAll: 'Tümünü Dışa Aktar',
    exportRange: 'Tarih Aralığını Dışa Aktar',
    fromDate: 'Başlangıç',
    toDate: 'Bitiş',
    cancel: 'İptal',
    export: 'Dışa Aktar',

    // Delete Account
    deleteAccount: 'Hesabı sil',
    deleteAccountWarning: 'Bu işlem geri alınamaz',
    deleteAccountDescription: 'Bu, hesabınızı ve tüm ruh hali takip verilerinizi, dönem bilgilerinizi ve notlarınızı kalıcı olarak silecektir. Bu verileri geri yükleyemezsiniz.',
    deleteAccountConfirm: 'Onaylamak için "DELETE" yazın',
    deleteAccountPlaceholder: 'DELETE\'i buraya yazın',
    deleteAccountCancel: 'İptal',
    deleteAccountDelete: 'Hesabı sil',
    deleteAccountSuccess: 'Hesap başarıyla silindi',
    deleteAccountError: 'Hesap silinemedi. Lütfen tekrar deneyin veya desteğe başvurun.',

    // Settings
    settingsTitle: 'Ayarlar',
    language: 'Dil',
    closeSettings: 'Ayarları kapat',
    enableCycleTracking: 'Döngü Takibini Etkinleştir',
    cycleTrackingDescription: 'Takvimde döngü takibini ve tahminleri gizlemek için bunu devre dışı bırakın.',
    enableReminders: 'Günlük Hatırlatıcıları Etkinleştir',
    remindersDescription: 'Ruh halinizi kaydetmeniz için hatırlatmak üzere her gün saat 20:00\'de bildirim alın.',
    remindersDeniedDescription: 'Bildirim izinleri engellendi. Bu özelliği kullanmak için tarayıcı ayarlarınızdan etkinleştirin.',
    notificationTitle: 'Nasıl hissediyorsunuz?',
    notificationBody: "Ruh halinizi Sağlık Günlüğünüz'e kaydetmeyi unutmayın!",

    // Data Management
    dataManagement: 'Veri Yönetimi',
    exportData: 'Veriyi Dışa Aktar',
    exportDescription: 'Tüm girişlerinizi ve ayarlarınızı bir JSON dosyasına indirin.',
    importData: 'Veriyi İçe Aktar',
    importDescription: 'Bir dosyadan veri içe aktarın. Bu, tüm mevcut verilerin üzerine yazar.',
    importWarningMessage: 'Bu dosyayı içe aktarmak istediğinizden emin misiniz? Tüm mevcut verileriniz kalıcı olarak üzerine yazılacak.',
    importError: 'Veri içe aktarılırken hata oluştu. Dosyanın geçerli bir dışa aktarma dosyası olduğundan emin olun ve tekrar deneyin.',

    // Year View
    yearView: 'Yıllık Görünüm',
    backToDashboard: 'Panele Dön',

    // Login Page
    loginSubtitle: 'Kişisel sağlık günlüğünüz.',
    emailPlaceholder: 'E-posta adresi',
    passwordPlaceholder: 'Şifre',
    showPasswordAria: 'Şifreyi göster',
    hidePasswordAria: 'Şifreyi gizle',
    signInButton: 'Giriş Yap',
    signUpButton: 'Kaydol',
    processingButton: 'İşleniyor...',
    noAccountPrompt: 'Hesabınız yok mu?',
    haveAccountPrompt: 'Zaten hesabınız var mı?',
    continueAsGuest: 'Misafir olarak devam et',
    errorBothFields: 'Lütfen hem e-posta hem şifre girin.',
    errorEmailInUse: 'Bu e-posta zaten kullanılıyor. Lütfen giriş yapın.',
    errorWeakPassword: 'Şifre en az 6 karakter olmalıdır.',
    errorInvalidCredentials: 'Geçersiz e-posta veya şifre.',
    errorUnexpected: 'Beklenmedik bir hata oluştu. Lütfen tekrar deneyin.',
    forgotPasswordPrompt: 'Şifrenizi mi unuttunuz?',
    resetPasswordTitle: 'Şifreyi Sıfırla',
    resetPasswordInstructions: 'E-postanızı girin ve şifrenizi sıfırlamanız için size bir bağlantı göndereceğiz.',
    sendResetLinkButton: 'Sıfırlama Bağlantısı Gönder',
    backToLogin: 'Girişe Dön',
    resetLinkSentSuccess: 'Şifre sıfırlama bağlantısı gönderildi! Gelen kutunuzu kontrol edin.',
    errorUserNotFound: 'Bu e-posta adresiyle hesap bulunamadı.',
    errorEnterEmail: 'Lütfen e-posta adresinizi girin.',
  },
  ar: {
    // App Header
    title_part1: 'متتبع',
    title_part2_cycle: 'الحالة المزاجية والدورة',
    title_part3: '',
    subtitle: 'تتبع مشاعرك اليومية واكتشف الأنماط في رحلة صحتك',
    practicesTitle: 'الممارسات',
    yearOverviewTitle: 'نظرة عامة سنوية',
    profileTitle: 'الملف الشخصي',
    settings: 'فتح الإعدادات',

    // Daily Affirmation
    affirmationLabel: 'التأكيد اليومي:',
    affirmationLoading: 'جارٍ تحميل إلهامك اليومي...',
    affirmationFallback: 'لديك القدرة على خلق يوم جميل.',
    affirmations: [
      "أنت كافٍ كما أنت.",
      "اليوم بداية جديدة مليئة بالفرص.",
      "أنت قادر على أشياء مذهلة.",
      "استنشق الهدوء، أخرج التوتر.",
      "أنت تستحق الحب والاحترام.",
      "إمكاناتك غير محدودة.",
      "الخطوات الصغيرة تؤدي إلى تغييرات كبيرة.",
      "أنت أقوى مما تظن.",
      "اختر الفرح اليوم.",
      "مشاعرك صالحة ومهمة.",
      "ثق في توقيت حياتك.",
      "أنت مسؤول عن سعادتك الخاصة.",
      "احتضن الرحلة، لا الهدف فقط.",
      "أنت تشع بالإيجابية والضوء.",
      "كل تحدٍ هو فرصة للنمو."
    ],

    // Main Interaction Card
    howAreYouFeeling: 'كيف تشعر في {date}؟',
    viewingPastEntry: 'أنت تشاهد إدخالاً سابقاً.',
    logFutureError: 'لا يمكنك تسجيل الإدخالات للتواريخ المستقبلية.',
    addNotePlaceholder: 'أضف ملاحظة قصيرة...',
    addNotePlaceholderFuture: 'لا يمكن إضافة ملاحظات للتواريخ المستقبلية.',
    saveEntry: 'حفظ الإدخال',
    updateEntry: 'تحديث',
    deleteEntry: 'حذف',
    saveEntryAria: 'حفظ الإدخال لـ {date}',
    updateEntryAria: 'تحديث الإدخال لـ {date}',
    deleteEntryAria: 'حذف الإدخال لـ {date}',

    // Moods
    [Mood.Amazing]: 'رائع',
    [Mood.Good]: 'جيد',
    [Mood.Okay]: 'مقبول',
    [Mood.Bad]: 'سيء',
    [Mood.Terrible]: 'مروع',
    selectMood: 'اختر المزاج: {mood}',

    // Cycle Tracker
    trackCycle: 'تتبع الدورة',
    todayPeriodDay: 'اليوم: يوم {day} من الدورة',
    periodStartsIn: 'تبدأ الدورة خلال {days} {pluralDays}',
    day_one: 'يوم',
    day_two: 'يوم',
    day_five: 'يوم',
    [CycleFlow.Light]: 'خفيف',
    [CycleFlow.Medium]: 'متوسط',
    [CycleFlow.Heavy]: 'غزير',

    // Calendar
    calendar: 'التقويم',
    prevMonth: 'الشهر السابق',
    nextMonth: 'الشهر التالي',
    weekDays: ['س', 'ح', 'ث', 'ر', 'خ', 'ج', 'س'],

    // Calendar Legend
    legendTitle: 'التوقعات:',
    legendPeriod: 'الدورة',
    legendFertile: 'النافذة الخصبة',
    legendOvulation: 'التبويض',
    disclaimer: 'التوقعات تقديرات. استخدم لأغراض معلوماتية فقط.',

    // Mood Summary
    moodSummary: 'ملخص المزاج',
    totalEntries: 'إجمالي الإدخالات',
    mostCommon: 'الأكثر شيوعاً',
    noMood: 'غير محدد',
    positiveMood: 'إيجابي',
    neutralMood: 'محايد',
    negativeMood: 'سلبي',

    // Wellness Tips
    aiWellnessTips: 'نصائح العافية',
    getNewTips: 'احصل على نصائح جديدة',
    unlockTips: 'استمر في تسجيل مزاجك لفتح نصائح العافية المخصصة!',
    entriesToGo: '{count} إدخال متبقي.',
    errorGeneratingTips: 'لا يمكن إنشاء النصائح في الوقت الحالي.',
    wellnessTips: {
      [Mood.Amazing]: [
        "شارك فرحك مع صديق أو شخص عزيز.",
        "اكتب في قسم الملاحظات بالضبط ما جعل اليوم رائعاً، لرؤيته في المرة القادمة التي تقوم فيها بتسجيل الدخول.",
        "استخدم هذه الطاقة للتعامل مع مهمة تؤجلها.",
        "التقط صورة لتسجيل هذا الشعور.",
        "انشر الإيجابية—أعطِ شخصاً إطراءً.",
        "تأمل في امتنانك وما يجلب لك السعادة."
      ],
      [Mood.Good]: [
        "حافظ على الزخم مع عادة إنتاجية صغيرة.",
        "اهدِ نفسك وجبة خفيفة صحية تحبها.",
        "خذ لحظة لتقدير الأشياء الصغيرة.",
        "قم بمشي قصير للاستمتاع بالهواء النقي.",
        "استمع إلى أغنيتك المفضلة التي ترفع الروح المعنوية.",
        "خطط لشيء ممتع في نهاية الأسبوع."
      ],
      [Mood.Okay]: [
        "خذ استراحة لمدة 5 دقائق للتمدد والتنفس.",
        "اشرب كوباً من الماء للانتعاش.",
        "استمع إلى بودكاست أو موسيقى تهمك.",
        "رتب منطقة صغيرة في مساحتك.",
        "اخرج للحظة في الطبيعة.",
        "اقرأ فصلاً من كتاب تحبه."
      ],
      [Mood.Bad]: [
        "كن لطيفاً مع نفسك؛ أيام سيئة أمر طبيعي.",
        "خذ بعض الأنفاس العميقة البطيئة للتركيز.",
        "ابتعد عن الشاشات لمدة 15 دقيقة.",
        "افعل شيئاً صغيراً يمنحك الراحة.",
        "اكتب شيئاً واحداً تشكر عليه، مهما كان صغيراً.",
        "اسمح لنفسك بالراحة بدون شعور بالذنب."
      ],
      [Mood.Terrible]: [
        "تواصل مع صديق موثوق أو عضو عائلة.",
        "ركز على عبور الساعة التالية.",
        "لف نفسك ببطانية دافئة واسترح.",
        "أولوية النوم والترطيب اليوم.",
        "تذكر أن المشاعر مؤقتة وستزول.",
        "مارس الرحمة الذاتية واللطف."
      ]
    },

    // Share App
    shareApp: 'مشاركة التطبيق مع الأصدقاء',
    shareAppMessage: 'اطلع على هذا التطبيق الرائع لتتبع مزاجك ودورتك! قم بتنزيل Mood & Period Tracker اليوم.',
    shareAppUrl: 'https://play.google.com/store/apps/details?id=com.moodtracker.app',

    // Rate App
    rateUs: 'قيمنا',
    rateAppUrl: 'https://play.google.com/store/apps/details?id=com.moodtracker.app',

    // Micro-Diary
    microDiary: 'المذكرة المصغرة',
    todaysReflection: 'تأمل اليوم',
    reflectionExplanationTitle: 'تمرين التأمل (يومياً، 1–3 دقائق)',
    reflectionExplanationText: ' - أحد أقوى الأدوات للعناية بصحتك النفسية. تدوين أفكارك يساعدك على رؤية الأنماط، واكتشاف ما يرفع من روحك المعنوية. يمكن أن يدعم الكتابة اليومية التكيف وتقليل تأثير الأحداث المجهدة – محتملاً تجنب الإرهاق والقلق المزمن.',
    reflectionLearnMore: 'تعرف على المزيد عن فوائد الكتابة اليومية',

    // Practices
    practices: 'الممارسات',
    practicesSubtitle: 'أدوات لطيفة للتوعية بالمزاج والرفاهية',
    dailyReflection: 'التأمل اليومي (المذكرة المصغرة)',
    dailyReflectionDesc: 'أحد أقوى الأدوات لفهم وتحسين مزاجك.',
    dailyReflectionTime: '2–3 دقائق',
    gratitudePractice: 'ممارسة الامتنان',
    gratitudePracticeDesc: 'لاحظ اللحظات الإيجابية الصغيرة من اليوم.',
    gratitudePracticeTime: '1–2 دقيقة',
    moodInfluencers: 'مؤثرات المزاج',
    moodInfluencersDesc: 'حدد ما أثر على مزاجك اليوم.',
    moodInfluencersTime: 'دقيقة واحدة',
    oneMinuteReset: 'إعادة تعيين دقيقة واحدة',
    oneMinuteResetDesc: 'استراحة سريعة لتهدئة الجسم والعقل.',
    oneMinuteResetTime: 'دقيقة واحدة',
    helpfulReading: 'قراءة مفيدة',
    helpfulReadingDesc: 'مقالات قصيرة لدعم المزاج ورعاية الذات.',
    helpfulReadingTime: 'اختياري',
    backToPractices: 'العودة إلى الممارسات',

    reflectionPrompt1: 'ما الذي جعلك تشعرين بالرضا اليوم؟',
    reflectionPrompt2: 'ما الذي استنزف طاقتك اليوم؟',
    reflectionHistory: 'تاريخ التأملات',
    noReflections: 'لا توجد تأملات بعد. ابدئي بإضافة تأمل اليوم أعلاه.',
    reflectionSaved: 'شكراً لك على تخصيص وقت لنفسك.',
    shortNotesEnough: 'الملاحظات القصيرة كافية 💜',
    exportHistoryAsPDF: 'تصدير التاريخ كملف PDF',
    exportReflections: 'تصدير التأملات',
    exportAll: 'تصدير الكل',
    exportRange: 'تصدير نطاق التاريخ',
    fromDate: 'من',
    toDate: 'إلى',
    cancel: 'إلغاء',
    export: 'تصدير',

    // Delete Account
    deleteAccount: 'حذف الحساب',
    deleteAccountWarning: 'لا يمكن التراجع عن هذا الإجراء',
    deleteAccountDescription: 'سيؤدي ذلك إلى حذف حسابك وجميع بيانات تتبع المزاج الخاصة بك، ومعلومات الدورة، والملاحظات بشكل دائم. لن تتمكن من استرداد هذه البيانات.',
    deleteAccountConfirm: 'اكتب "DELETE" للتأكيد',
    deleteAccountPlaceholder: 'اكتب DELETE هنا',
    deleteAccountCancel: 'إلغاء',
    deleteAccountDelete: 'حذف الحساب',
    deleteAccountSuccess: 'تم حذف الحساب بنجاح',
    deleteAccountError: 'فشل في حذف الحساب. يرجى المحاولة مرة أخرى أو الاتصال بالدعم.',

    // Settings
    settingsTitle: 'الإعدادات',
    language: 'اللغة',
    closeSettings: 'إغلاق الإعدادات',
    enableCycleTracking: 'تمكين تتبع الدورة',
    cycleTrackingDescription: 'عطل هذا لإخفاء تتبع الدورة والتوقعات في التقويم.',
    enableReminders: 'تمكين التذكيرات اليومية',
    remindersDescription: 'احصل على إشعار كل يوم في الساعة 8 مساءً لتذكيرك بتسجيل مزاجك.',
    remindersDeniedDescription: 'تم حظر أذونات الإشعارات. يرجى تمكينها في إعدادات المتصفح لاستخدام هذه الميزة.',
    notificationTitle: 'كيف تشعر؟',
    notificationBody: "لا تنس تسجيل مزاجك في دفتر اليومية الصحي!",

    // Data Management
    dataManagement: 'إدارة البيانات',
    exportData: 'تصدير البيانات',
    exportDescription: 'قم بتنزيل جميع إدخالاتك وإعداداتك إلى ملف JSON.',
    importData: 'استيراد البيانات',
    importDescription: 'استورد البيانات من ملف. سيؤدي هذا إلى استبدال جميع البيانات الحالية.',
    importWarningMessage: 'هل أنت متأكد من أنك تريد استيراد هذا الملف؟ سيتم استبدال جميع بياناتك الحالية بشكل دائم.',
    importError: 'خطأ في استيراد البيانات. تأكد من أن الملف ملف تصدير صالح وحاول مرة أخرى.',

    // Year View
    yearView: 'العرض السنوي',
    backToDashboard: 'العودة إلى لوحة التحكم',

    // Login Page
    loginSubtitle: 'دفتر يومية صحتك الشخصي.',
    emailPlaceholder: 'عنوان البريد الإلكتروني',
    passwordPlaceholder: 'كلمة المرور',
    showPasswordAria: 'إظهار كلمة المرور',
    hidePasswordAria: 'إخفاء كلمة المرور',
    signInButton: 'تسجيل الدخول',
    signUpButton: 'التسجيل',
    processingButton: 'جارٍ المعالجة...',
    noAccountPrompt: 'ليس لديك حساب؟',
    haveAccountPrompt: 'لديك حساب بالفعل؟',
    continueAsGuest: 'المتابعة كضيف',
    errorBothFields: 'يرجى إدخال البريد الإلكتروني وكلمة المرور.',
    errorEmailInUse: 'هذا البريد الإلكتروني قيد الاستخدام بالفعل. يرجى تسجيل الدخول.',
    errorWeakPassword: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل.',
    errorInvalidCredentials: 'بريد إلكتروني أو كلمة مرور غير صالحة.',
    errorUnexpected: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.',
    forgotPasswordPrompt: 'نسيت كلمة المرور؟',
    resetPasswordTitle: 'إعادة تعيين كلمة المرور',
    resetPasswordInstructions: "أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور.",
    sendResetLinkButton: 'إرسال رابط إعادة التعيين',
    backToLogin: 'العودة إلى تسجيل الدخول',
    resetLinkSentSuccess: 'تم إرسال رابط إعادة تعيين كلمة المرور! تحقق من صندوق البريد الوارد.',
    errorUserNotFound: 'لم يتم العثور على حساب بهذا العنوان البريدي.',
    errorEnterEmail: 'يرجى إدخال عنوان بريدك الإلكتروني.',
  },
  ru: {
    // App Header
    title_part1: 'Трекер настроения',
    title_part2_cycle: 'и цикла',
    title_part3: '',
    subtitle: 'Отслеживайте свои ежедневные эмоции и находите закономерности в своем самочувствии',
    practicesTitle: 'Практики',
    yearOverviewTitle: 'Годовой обзор',
    profileTitle: 'Профиль',
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
    updateEntry: 'Обновить',
    deleteEntry: 'Удалить',
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

    // Share App
    shareApp: 'Поделиться приложением с друзьями',
    shareAppMessage: 'Посмотрите это замечательное приложение для отслеживания настроения и цикла! Скачайте Mood & Period Tracker сегодня.',
    shareAppUrl: 'https://play.google.com/store/apps/details?id=com.moodtracker.app',

    // Rate App
    rateUs: 'Оцените нас',
    rateUsMessage: 'Мы небольшая команда, которая заботливо создаёт это приложение 💜 Если вам нравится наше приложение, ваша оценка поможет нам развиваться.',
    rateAppUrl: 'https://play.google.com/store/apps/details?id=com.moodtracker.app',

    // Micro-Diary
    microDiary: 'Микро-дневник',
    todaysReflection: 'Размышления на сегодня',
    reflectionExplanationTitle: 'Упражнение на размышление (ежедневно, 1–3 минуты)',
    reflectionExplanationText: ' - один из самых мощных инструментов для заботы о вашем психическом благополучии. Запись мыслей помогает увидеть закономерности, обнаружить, что поднимает настроение. Ведение дневника может поддерживать coping и снижать влияние стрессовых событий – потенциально избегая выгорания и хронической тревоги.',
    reflectionLearnMore: 'Узнайте больше о преимуществах ведения дневника',

    // Practices
    practices: 'Практики',
    practicesSubtitle: 'Нежные инструменты для осведомленности о настроении и благополучии',
    dailyReflection: 'Ежедневное размышление (Микро-дневник)',
    dailyReflectionDesc: 'Один из самых мощных инструментов для понимания и улучшения вашего настроения.',
    dailyReflectionTime: '2–3 минуты',
    gratitudePractice: 'Практика благодарности',
    gratitudePracticeDesc: 'Замечайте небольшие положительные моменты сегодняшнего дня.',
    gratitudePracticeTime: '1–2 минуты',
    moodInfluencers: 'Влияния на настроение',
    moodInfluencersDesc: 'Определите, что повлияло на ваше настроение сегодня.',
    moodInfluencersTime: '1 минута',
    oneMinuteReset: '1-минутный перезапуск',
    oneMinuteResetDesc: 'Короткая пауза для успокоения тела и разума.',
    oneMinuteResetTime: '1 минута',
    helpfulReading: 'Полезное чтение',
    helpfulReadingDesc: 'Короткие статьи для поддержки настроения и заботы о себе.',
    helpfulReadingTime: 'По желанию',
    backToPractices: 'Вернуться к практикам',

    reflectionPrompt1: 'Что заставило вас чувствовать себя хорошо сегодня?',
    reflectionPrompt2: 'Что истощило вашу энергию сегодня?',
    reflectionHistory: 'История размышлений',
    noReflections: 'Пока нет размышлений. Начните с добавления сегодняшних размышлений выше.',
    reflectionSaved: 'Спасибо, что уделили время себе.',
    shortNotesEnough: 'Короткие заметки достаточно 💜',
    exportHistoryAsPDF: 'Экспорт истории в PDF',
    exportReflections: 'Экспорт размышлений',
    exportAll: 'Экспорт всего',
    exportRange: 'Экспорт диапазона дат',
    fromDate: 'С',
    toDate: 'По',
    cancel: 'Отмена',
    export: 'Экспорт',

    // Delete Account
    deleteAccount: 'Удалить аккаунт',
    deleteAccountWarning: 'Это действие нельзя отменить',
    deleteAccountDescription: 'Это навсегда удалит ваш аккаунт и все данные отслеживания настроения, информацию о периодах и заметки. Вы не сможете восстановить эти данные.',
    deleteAccountConfirm: 'Введите "DELETE" для подтверждения',
    deleteAccountPlaceholder: 'Введите DELETE здесь',
    deleteAccountCancel: 'Отмена',
    deleteAccountDelete: 'Удалить аккаунт',
    deleteAccountSuccess: 'Аккаунт успешно удален',
    deleteAccountError: 'Не удалось удалить аккаунт. Попробуйте еще раз или обратитесь в поддержку.',

    // Settings
    settingsTitle: 'Настройки',
    language: 'Язык',
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
