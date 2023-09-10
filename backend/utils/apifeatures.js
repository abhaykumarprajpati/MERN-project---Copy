class ApiFeatures {
    constructor(query, queryStr) {
        //querystr is : keyword =samosa
        //querystr in the url means anything after eg:http://localhost:4000/products?keyword=samosa


        this.query = query;
        this.queryStr = queryStr;
    }
    search() {

        const keyword = this.queryStr.keyword ? {
            //we have make name that what we want to search, for that we use mongodb operator $regex-regular expression
            //$options: "i" means case insensitive(ABX=abx)
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",//i means case insensitive A a
            }
        } : {};




        //Product.find() becomes this.query.find({...keyword})
        this.query = this.query.find({ ...keyword });
        console.log("this is keyword", keyword)
        return this;//meaning we return class 
    }

    filter() {
        //  const queryCopy ={this.queryStr}
        const queryCopy = { ...this.queryStr }
       

        // console.log(queryCopy)
        //Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach(key => delete queryCopy[key])
       
        //eg: queryCopy -- {category:"laptop"}

        //Filter for Price and Rating
        // console.log(queryCopy)// This is a object , we convert it into string
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)




        // this.query = this.query.find(queryCopy)
        this.query = this.query.find(JSON.parse(queryStr));
        // console.log(queryStr);
        //this.query=Product.find()
        return this;
    }
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;


        const skip = resultPerPage * (currentPage - 1)
        //10*(3-1)
        //10*2=20, so 20 product skip and will display from 21
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}


module.exports = ApiFeatures