import mondaySdk from 'monday-sdk-js';

export class EntryService {
  create(
    boardId: string,
    mondayDeveloperToken: string,
    name: string,
    nameColumn: string,
    business: string,
    businessColumn: string,
    contactNumber: string,
    contactNumberColumn: string,
    email: string,
    emailColumn: string,
    message: string
  ): Promise<boolean> {
    const monday = mondaySdk();
    monday.setToken(mondayDeveloperToken);
    return monday
      .api(
        `
        query {
          boards(ids: [${boardId}]) {
            columns {
              title
              id
            }
          }
        }
        `
      )
      .then((response) => response.data.boards[0].columns)
      .then((columns: Array<{ title: string; id: string }>) =>
        columns.reduce(
          (previous, { title, id }) => Object.assign(previous, { [title]: id }),
          {}
        )
      )
      .then((ids: { [key: string]: string }) => ({
        [ids[nameColumn]]: name,
        [ids[businessColumn]]: business,
        [ids[contactNumberColumn]]: {
          phone: contactNumber.replace(/\s+/g, ''),
          countryShortName: 'AU',
        },
        [ids[emailColumn]]: { email, text: email },
      }))
      .then((columnValues) =>
        monday
          .api(
            `
            mutation {
              create_item(
                board_id: ${boardId},
                item_name: "${name}",
                column_values: ${JSON.stringify(JSON.stringify(columnValues))}
              ) {
                id
              }
            }
          `
          )
          .then((response) =>
            monday.api(`
            mutation {
              create_update (item_id: ${response.data.create_item.id}, body: "${message}") {
                id
              }
            }
          `)
          )
          .then(() => true)
      );
  }
}

export default new EntryService();
