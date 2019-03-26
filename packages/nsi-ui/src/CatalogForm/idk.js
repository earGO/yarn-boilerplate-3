function parseSheet(filePath, sheetNum) {
  if (sheetNum === undefined) {
      return false;
  }

  let items = [];

  let workbook = xlsx.readFile(filePath, {type: 'binary'});

  let sheetName = workbook.SheetNames[sheetNum];

  let sheet = workbook.Sheets[sheetName];

  if (sheetNum == SHEETS['terrorists']) {
      let row = 2;
      while (sheet['B' + (++row)]) {
          let user = {};
          user.name = sheet['B' + row] ? sheet['B' + row].v : undefined;
          user.birth = sheet['C' + row] ? sheet['C' + row].v : undefined;
          user.doc = sheet['D' + row]? sheet['D' + row].v : undefined;
          user.address = sheet['E' + row]? sheet['E' + row].v : undefined;

          if (!user.name) {
              continue;
          }

          items.push(user);
      }
  }

  if (sheetNum == SHEETS['iccntribs']) {
      let row = 1;
      while (sheet['B' + (++row)]) {
          let user = {};
          user.fullname = sheet['B' + row].v;
          user.surname = sheet['C' + row] ? sheet['C' + row].v : undefined;
          user.name = sheet['D' + row] ? sheet['D' + row].v : undefined;
          user.patronymic = sheet['E' + row] ? sheet['E' + row].v : undefined;
          user.fullnameEng = sheet['F' + row] ? sheet['F' + row].v : undefined;
          user.birthDate = sheet['G' + row] ? sheet['G' + row].v : undefined;
          if (typeof user.birthDate == 'number') {
              user.birthDate = new Date(1900, 0, user.birthDate - 1);
              user.birthDate = datesHelper.getDate(user.birthDate, "iso");
          }
          user.birthYear = sheet['H' + row] ? sheet['H' + row].v : undefined;
          user.address = sheet['I' + row] ? sheet['I' + row].v : undefined;

          if (!user.fullname) {
              continue;
          }
          items.push(user);
      }
  }

  return items;
}