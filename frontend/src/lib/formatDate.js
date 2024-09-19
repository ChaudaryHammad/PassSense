export const formatDate = (birthDate) => {
    if (birthDate.length !== 6) {
      return 'Invalid date';
    }

    const year = parseInt(birthDate.substring(0, 2), 10);
    const month = parseInt(birthDate.substring(2, 4), 10);
    const day = parseInt(birthDate.substring(4, 6), 10);

    const currentYear = new Date().getFullYear() % 100;
    const fullYear = year > currentYear ? 1900 + year : 2000 + year;

    return `${day}-${month}-${fullYear}`;
  };

