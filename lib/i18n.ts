export type Locale = 'da' | 'en'

export const DEFAULT_LOCALE: Locale = 'da'

export const LOCALES: { code: Locale; flag: string; label: string }[] = [
  { code: 'da', flag: '🇩🇰', label: 'DK' },
  { code: 'en', flag: '🇬🇧', label: 'EN' },
]

type Dict = Record<string, string>

const da: Dict = {
  // Nav / chrome
  'nav.dashboard': 'Oversigt',
  'nav.testModeOnly': '⚠️ Kun testtilstand',
  'topbar.searchPlaceholder': 'Søg i boksen...',
  'topbar.signOut': 'Log ud',
  'topbar.user': 'Bruger',
  'topbar.language': 'Sprog',
  'auth.or': 'Eller',
  'auth.googleSignIn': 'Fortsæt med Google',
  'banner.testMode': '⚠️ TESTTILSTAND — Kun til demoformål. Indtast ikke rigtige data.',

  // Categories
  'cat.PASSWORD': 'Adgangskoder',
  'cat.DEVICE': 'Enheder',
  'cat.SUBSCRIPTION': 'Abonnementer',
  'cat.NOTE': 'Sikre noter',
  'cat.FAMILY': 'Familie',
  'catDesc.PASSWORD': 'Administrer gemte adgangskoder og loginoplysninger',
  'catDesc.DEVICE': 'Hold styr på familiens enheder og deres oplysninger',
  'catDesc.SUBSCRIPTION': 'Hold styr på aktive abonnementer',
  'catDesc.NOTE': 'Opbevar følsomme noter sikkert',
  'catDesc.FAMILY': 'Oplysninger om familiemedlemmer',

  // Dashboard
  'dash.welcomeTitle': 'Velkommen til din boks',
  'dash.welcomeSubtitle': 'Administrer og organiser familieoplysninger sikkert.',
  'dash.recentItems': 'Seneste elementer',
  'dash.noEntries': 'Ingen poster endnu. Begynd at tilføje elementer til din boks.',

  // Category view
  'view.addNew': 'Tilføj ny',
  'view.filter': 'Filtrer {x}...',
  'view.noEntriesTitle': 'Ingen poster endnu',
  'view.noEntriesDesc': 'Tilføj din første for at komme i gang.',
  'view.addEntry': 'Tilføj {x}',
  'view.edit': 'Rediger',
  'view.delete': 'Slet',
  'view.category': 'Kategori',

  // Card
  'card.shared': 'Delt',
  'card.personal': 'Privat',

  // Delete dialog
  'del.title': 'Slet post',
  'del.confirm': 'Er du sikker på, at du vil slette "{x}"? Denne handling kan ikke fortrydes.',
  'del.cancel': 'Annuller',
  'del.delete': 'Slet',
  'del.deleted': 'Post slettet',
  'del.failed': 'Kunne ikke slette posten',

  // Entry dialog
  'dlg.editTitle': 'Rediger post',
  'dlg.addTitle': 'Tilføj ny post',
  'dlg.editDesc': 'Opdater detaljerne nedenfor.',
  'dlg.addDesc': 'Udfyld detaljerne for at oprette en ny post.',
  'dlg.title': 'Titel',
  'dlg.titlePlaceholder': 'Posttitel',
  'dlg.shareWithFamily': 'Del med familien',
  'dlg.shareDesc': 'Gør synlig for alle familiemedlemmer',
  'dlg.cancel': 'Annuller',
  'dlg.update': 'Opdater',
  'dlg.create': 'Opret',
  'dlg.titleRequired': 'Titel er påkrævet',
  'dlg.updated': 'Post opdateret',
  'dlg.created': 'Post oprettet',
  'dlg.saveFailed': 'Kunne ikke gemme posten',

  // Field labels
  'f.usernameEmail': 'Brugernavn / E-mail',
  'f.password': 'Adgangskode',
  'f.website': 'Websted-URL',
  'f.notes': 'Noter',
  'f.deviceType': 'Enhedstype',
  'f.brandModel': 'Mærke / Model',
  'f.serialNumber': 'Serienummer',
  'f.osVersion': 'OS / Version',
  'f.planTier': 'Plan / Niveau',
  'f.billingCycle': 'Betalingscyklus',
  'f.cost': 'Pris ($)',
  'f.renewalDate': 'Fornyelsesdato',
  'f.loginEmail': 'Login-e-mail',
  'f.categoryTag': 'Kategorimærke',
  'f.content': 'Indhold',
  'f.relationship': 'Relation',
  'f.birthday': 'Fødselsdag',
  'f.phone': 'Telefon',
  'f.email': 'E-mail',
  'f.noteContentPlaceholder': 'Din sikre note...',

  // Select options
  'opt.phone': 'Telefon',
  'opt.laptop': 'Bærbar',
  'opt.tablet': 'Tablet',
  'opt.router': 'Router',
  'opt.other': 'Andet',
  'opt.monthly': 'Månedligt',
  'opt.annual': 'Årligt',
}

const en: Dict = {
  'nav.dashboard': 'Dashboard',
  'nav.testModeOnly': '⚠️ Test Mode Only',
  'topbar.searchPlaceholder': 'Search vault...',
  'topbar.signOut': 'Sign out',
  'topbar.user': 'User',
  'topbar.language': 'Language',
  'auth.or': 'Or',
  'auth.googleSignIn': 'Continue with Google',
  'banner.testMode': '⚠️ TEST MODE — For demo purposes only. Do not enter real data.',

  'cat.PASSWORD': 'Passwords',
  'cat.DEVICE': 'Devices',
  'cat.SUBSCRIPTION': 'Subscriptions',
  'cat.NOTE': 'Secure Notes',
  'cat.FAMILY': 'Family',
  'catDesc.PASSWORD': 'Manage saved passwords and credentials',
  'catDesc.DEVICE': 'Track family devices and their info',
  'catDesc.SUBSCRIPTION': 'Keep track of active subscriptions',
  'catDesc.NOTE': 'Store sensitive notes securely',
  'catDesc.FAMILY': 'Family member information',

  'dash.welcomeTitle': 'Welcome to your vault',
  'dash.welcomeSubtitle': 'Manage and organize family information securely.',
  'dash.recentItems': 'Recent Items',
  'dash.noEntries': 'No entries yet. Start adding items to your vault.',

  'view.addNew': 'Add New',
  'view.filter': 'Filter {x}...',
  'view.noEntriesTitle': 'No entries yet',
  'view.noEntriesDesc': 'Add your first one to get started.',
  'view.addEntry': 'Add {x}',
  'view.edit': 'Edit',
  'view.delete': 'Delete',
  'view.category': 'Category',

  'card.shared': 'Shared',
  'card.personal': 'Personal',

  'del.title': 'Delete Entry',
  'del.confirm': 'Are you sure you want to delete "{x}"? This action cannot be undone.',
  'del.cancel': 'Cancel',
  'del.delete': 'Delete',
  'del.deleted': 'Entry deleted',
  'del.failed': 'Failed to delete entry',

  'dlg.editTitle': 'Edit Entry',
  'dlg.addTitle': 'Add New Entry',
  'dlg.editDesc': 'Update the details below.',
  'dlg.addDesc': 'Fill in the details to create a new entry.',
  'dlg.title': 'Title',
  'dlg.titlePlaceholder': 'Entry title',
  'dlg.shareWithFamily': 'Share with family',
  'dlg.shareDesc': 'Make visible to all family members',
  'dlg.cancel': 'Cancel',
  'dlg.update': 'Update',
  'dlg.create': 'Create',
  'dlg.titleRequired': 'Title is required',
  'dlg.updated': 'Entry updated',
  'dlg.created': 'Entry created',
  'dlg.saveFailed': 'Failed to save entry',

  'f.usernameEmail': 'Username / Email',
  'f.password': 'Password',
  'f.website': 'Website URL',
  'f.notes': 'Notes',
  'f.deviceType': 'Device Type',
  'f.brandModel': 'Brand / Model',
  'f.serialNumber': 'Serial Number',
  'f.osVersion': 'OS / Version',
  'f.planTier': 'Plan / Tier',
  'f.billingCycle': 'Billing Cycle',
  'f.cost': 'Cost ($)',
  'f.renewalDate': 'Renewal Date',
  'f.loginEmail': 'Login Email',
  'f.categoryTag': 'Category Tag',
  'f.content': 'Content',
  'f.relationship': 'Relationship',
  'f.birthday': 'Birthday',
  'f.phone': 'Phone',
  'f.email': 'Email',
  'f.noteContentPlaceholder': 'Your secure note...',

  'opt.phone': 'Phone',
  'opt.laptop': 'Laptop',
  'opt.tablet': 'Tablet',
  'opt.router': 'Router',
  'opt.other': 'Other',
  'opt.monthly': 'Monthly',
  'opt.annual': 'Annual',
}

export const TRANSLATIONS: Record<Locale, Dict> = { da, en }

export function translate(locale: Locale, key: string, vars?: Record<string, string>): string {
  const dict = TRANSLATIONS[locale] ?? TRANSLATIONS[DEFAULT_LOCALE]
  let str = dict[key] ?? TRANSLATIONS[DEFAULT_LOCALE][key] ?? key
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), v)
    }
  }
  return str
}
