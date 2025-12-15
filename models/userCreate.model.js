export const createUserQuery = `
INSERT INTO userInfo (name, password,gmail,walletid)
VALUES ($1, $2,$3,$4)
RETURNING *;
`;