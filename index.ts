import mongoose from 'mongoose';

const { Schema, Types } = mongoose;

const connectionUri = 'mongodb://localhost:27017/mongo-exercises';

const courseSchema = new Schema({
    name : { type : String, required : true},
    author : String,
    tags : [ String ],
    date : { type : Date , default : Date.now },
    isPublished : Boolean,
    price: Number,
})

const Course = mongoose.model('Course', courseSchema);

const openConnection = async (): Promise<void> => {
    try {
        await mongoose.connect(connectionUri);

        console.log('Connected to MongoDB');

        await removeCourse('6583345e4e72b00b8c217cbf');

    }catch(err){
        console.error(`Resolved with an error ${err}`);
    }finally{
        closeConnection();
    }
}


const closeConnection = async (): Promise<void> => {
    try {
        await mongoose.connection.close();

        console.log('Successfully closed connection');

    }catch(err){
        console.error(`Resolved with an error ${err}`);
    }
}


const getCourses = async() : Promise<void> => {
    try {
        // const course = await Course
        //     .find({ isPublished: true, tags: { $in: ['backend'] } })
        //     .sort({ name: 1 })
        //     .select({ name: 1, author: 1 });

        // const query  = await Course
        //     .find({ isPublished : true })
        //     .sort({ price: -1})
        //     .select({ name : 1, author: 1, price: 1});

        const query  = await Course
            .find()
            .or([ 
                { name: /.*by.*/i }, { price : { $gte : 15 } } 
            ]);        
    
        console.log(`The filtered out courses are \n ${query}`);

    }catch(err){
        console.error('Error fetching courses:', err);
    }finally{
        console.log('Completed operation')
    }
}

const removeCourse = async (id: string): Promise<void> => {
    // const result = await Course.deleteOne({ _id: id });

    try {
        const course = await Course.findOneAndDelete({ _id: id });
    
        if (course) {
            console.log('Course deleted successfully:', course);
        } else {
            console.log('Course not found.');
        }
    } catch (error) {
        console.error('Error deleting course:', error);
    }
    
}

const updateCourse = async (id: string): Promise<void> => {

    // Update by query first ( Returns the updated course )
    const course = await Course.findByIdAndUpdate(
        id,
        { $set: { isPublished: true, author: 'Bamidele Ajewole' } },
        { new: true } // This option returns the updated document
    );

    // Update directly 
    const result = await Course.updateOne({ _id : id}, {
        $set: { 
            isPublished: true, 
            author: 'Bamidele Ajewole'
        }
    });

    console.log(result);
};

openConnection();
