const { Pool } = require('pg');
const connectionString = process.env.CON_STR;
const db = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });

class QueryFilter {
    constructor() {
        async () => await db.connect();
    }
    findInList(rq) {
        const { keyname, arraydata } = rq;
        let found = arraydata.find(x => x.key === keyname);
        if (arraydata.includes(found))
            return { success: true, found };
        else if (keyname.length > 0) {
            let flter = arraydata.map(x => x.id);
            let nextid = Math.max(...flter) + 1;
            arraydata.push({
                id: nextid,
                time: new Date(),
                key: keyname
            });
            return { success: true }
        }
        return { success: false }
    }

    async searchInCodes(rq) {
        try {
            const { country, zip, nbhood, city, dist } = rq;
            let query = "SELECT * FROM postalcode";
            let where = [];
            if (!(!(country))) where.push("countrycode LIKE '%" + country + "%'");
            if (!(!(zip))) where.push("\"postalcode\" = '" + zip + "'");
            if (!(!(nbhood))) where.push("mahalle LIKE '%" + nbhood + "%'");
            if (!(!(city))) where.push("city LIKE '%" + city + "%'");
            if (!(!(dist))) where.push("ilce LIKE '%" + dist + "%'");

            if (where.length > 0) {
                query += " WHERE";
                let ix = 0;
                where.forEach(w => {
                    if (ix > 0) query += " AND";
                    query += ' ' + w;
                    ix++;
                });
                query += " LIMIT 10";
            }
            let found = await db.query(query);
            if (found.rows.length > 0)
                return { success: true, data: found.rows };
            else
                return { success: false, data: "nothing found" };

        } catch (err) {
            return { success: false, data: err };
        }
    }
}
module.exports = QueryFilter;