export function MetaTitlePage(title: string) {
  let descriptionPage: string = 'Main page';
  switch (title) {
    case 'Login':
      descriptionPage = 'Login page';
      break;
    case 'Offer':
      descriptionPage = 'Offer for you';
      break;
    case 'Favorites':
      descriptionPage = 'Your favorites offers';
      break;
  }
  return descriptionPage;
}

export function getMetaTitlePage(path: string): string {
  let namePage: string = 'Main';
  switch (path) {
    case '/login':
      namePage = 'Login';
      break;
    case '/offer':
      namePage = 'Offer';
      break;
    case '/favorites':
      namePage = 'Favorites';
      break;
  }
  return namePage;
}
