createHier = {
  name: 'Тест иерархии',
  description: 'Клевый каталог.',
  attributes: [
    { key: '86137c8b-8259-4619-be4d-bcc6c899aa59', title: 'Строка', type: 'string', required: true, note: '1' },
  ],
  type: true,
}

// UPDATE?
createRowHierar = {
  key: 'ec3aebf6-38b6-4307-bf4b-70c03a01d76d',
  catalogId: '2c46f8bc-7e6d-41d2-926d-0b9b3cb807bd',
  parentId: '15c59a1d-533f-4928-aa3f-4bac841b38ba',
  removed: false,
}

// MarkDeleted
deleteRowPayl = {
  key: 'ec3aebf6-38b6-4307-bf4b-70c03a01d76d',
  catalogId: '2c46f8bc-7e6d-41d2-926d-0b9b3cb807bd',
  parentId: '15c59a1d-533f-4928-aa3f-4bac841b38ba',
  removed: true,
  '86137c8b-8259-4619-be4d-bcc6c899aa59': 'Вагонка',
}
