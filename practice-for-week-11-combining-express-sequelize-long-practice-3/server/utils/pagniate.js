export function paginate (req, res, next) {

    let page = req.query.page ? parseInt(req.query.page) : 1;
    let size = req.query.size ? parseInt(req.query.size) : 10;

    // Pre-set limit to null and offset to 0. SQL interprets the null values as 'unlimited'
    let limit = null;
    let offset = 0;

    if ( !(/^[0-9]+$/.test(size)) || !(/^[0-9]+$/.test(page)) || (Number(page) === 0 && Number(size) !== 0) || (Number(page) !== 0 && Number(size) === 0)) {
        errorResult.errors.push({ message: 'Requires valid page and size params' });
    } else {
        // page >= 1 && size >= 1 conditional still required as otherwise query result will be empty
        if (page >=1 && size >= 1){
            limit = size > 200 ? 200 : size;    // max size = 200
            offset = size * (page -1);
        }
    }
    next();

}
