const express = require('express');
const router = express.Router();
router.use(express.json({ limit: '10mb' }));
const bcrypt = require('bcrypt');

require('../db/conn');

const user = require("../model/userSchema");
const greview = require("../model/greview");
const Batch = require('../model/batchesSchema');
const Course = require('../model/coursesdata');
const Price = require('../model/priceschema');
const Peeps = require('../model/peepsSchema');
const Sales = require('../model/salesSchema');
const Opr = require('../model/oprSchema');
const Manager = require('../model/managerSchema');
const Teacher = require('../model/teacherSchema');


router.get('/', (req, res) => {
    res.send('Hello world from router');
});

// ---------------------------------------------------register page ----------------------------

router.post('/register', async(req, res) => {
    const { paragraph, name, position, image } = req.body;

    if (!paragraph || !name || !position || !image) {
        return res.status(400).json({ error: 'Please provide all required field' });
    }

    try {
        const userExist = await user.findOne({ name: name });

        if (userExist) {
            return res.status(422).json({ error: "User already exists" });
        }

        const User = new user({ paragraph, name, position, image });

        await User.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to register" });
    }
});

router.get('/register', async(req, res) => {
    try {
        // Retrieve all users from the database
        const users = await user.find();

        // Check if any users were found
        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        // If users were found, send them in the response
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});


// ---------------------------------------------------greview page ----------------------------

router.post('/greview', async(req, res) => {
    const { paragraph, name, star, image } = req.body;

    if (!paragraph || !name || !star || !image) {
        return res.status(400).json({ error: 'Please provide all required field' });
    }

    try {
        const userExist = await greview.findOne({ name: name });

        if (userExist) {
            return res.status(422).json({ error: "User already exists" });
        }

        const User = new greview({ paragraph, name, star, image });

        await User.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to register" });
    }
});

router.get('/greview', async(req, res) => {
    try {
        // Retrieve all users from the database
        const users = await greview.find();

        // Check if any users were found
        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        // If users were found, send them in the response
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// --------------------------------------------------- recent batches  ----------------------------

router.put('/recentbatches/:id', async(req, res) => {
    const batchId = req.params.id;
    const { date, mmyy, time, th, mentorName, mentorPosition, scholarshippercent, scholarshipRupee, limitedseats, image } = req.body;

    if (!date || !mmyy || !time || !th || !mentorName || !mentorPosition || !scholarshippercent || !scholarshipRupee || !limitedseats || !image) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    try {
        // Check if the batch with the specified ID exists
        const existingBatch = await Batch.findById(batchId);

        if (!existingBatch) {
            return res.status(404).json({ error: 'Batch not found' });
        }

        // Update the batch fields
        existingBatch.date = date;
        existingBatch.th = th;
        existingBatch.mmyy = mmyy;
        existingBatch.time = time;
        existingBatch.mentorName = mentorName;
        existingBatch.mentorPosition = mentorPosition;
        existingBatch.scholarshippercent = scholarshippercent;
        existingBatch.scholarshipRupee = scholarshipRupee;
        existingBatch.limitedseats = limitedseats;
        existingBatch.image = image;


        // Save the updated batch
        await existingBatch.save();

        res.status(200).json({ message: 'Batch updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update batch' });
    }
});


router.get('/recentbatches', async(req, res) => {
    try {
        // Retrieve all users from the database
        const users = await Batch.find();

        // Check if any users were found
        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        // If users were found, send them in the response
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});



// --------------------------------------------------- price ----------------------------

router.put('/price/:id', async(req, res) => {
    const priceId = req.params.id;
    const { priceindia, priceglobal } = req.body;

    if (!priceindia || !priceglobal) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    try {
        // Check if the batch with the specified ID exists
        const existingBatch = await Price.findById(priceId);

        if (!existingBatch) {
            return res.status(404).json({ error: 'Batch not found' });
        }

        // Update the batch fields
        existingBatch.priceindia = priceindia;
        existingBatch.priceglobal = priceglobal;


        // Save the updated batch
        await existingBatch.save();

        res.status(200).json({ message: 'Batch updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update batch' });
    }
});



router.get('/price', async(req, res) => {
    try {
        // Retrieve all users from the database
        const users = await Price.find();

        // Check if any users were found
        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        // If users were found, send them in the response
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});


// -------------------------------------------courses data---------------------------

router.post('/coursedata', async(req, res) => {
    const { title, description, lessons, duration, certificates, price, img } = req.body;

    if (!title || !description || !lessons || !duration || !certificates || !price || !img) {
        return res.status(400).json({ error: 'Please provide all required field' });
    }

    try {
        const userExist = await Course.findOne({ title: title });

        if (userExist) {
            return res.status(422).json({ error: "User already exists" });
        }

        const User = new Course({ title, description, lessons, duration, certificates, price, img });

        await User.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to register" });
    }
});


// ---------------------------------------peeps data--------------------



router.post('/peeps', async(req, res) => {
    const { name, jobTitle, description, image, placedImage } = req.body;

    if (!name || !jobTitle || !description || !image || !placedImage) {
        return res.status(400).json({ error: 'Please provide all required field' });
    }

    try {
        const userExist = await Peeps.findOne({ name: name });

        if (userExist) {
            return res.status(422).json({ error: "User already exists" });
        }

        const User = new greview({ name, jobTitle, description, image, placedImage });

        await User.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to register" });
    }
});

router.get('/peeps', async(req, res) => {
    try {
        // Retrieve all users from the database
        const users = await Peeps.find();

        // Check if any users were found
        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        // If users were found, send them in the response
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});



// ---------------------------peeeps ends-------------------



router.get('/coursedata', async(req, res) => {
    try {
        // Retrieve all users from the database
        const users = await Course.find();

        // Check if any users were found
        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        // If users were found, send them in the response
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});



router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "fill all data" });
        }

        const userLog = await user.findOne({ email: email });

        if (userLog) {
            const isMatch = await bcrypt.compare(password, userLog.password)

            if (!isMatch) {
                res.status(400).json({ message: "shit bro error in password" });
            } else {
                res.json({ message: "successfull bro" });
            }
        } else {
            res.status(400).json({ message: "shit bro error in email" });
        }




        console.log(userLog);


    } catch (err) {
        console.error("Error in login", err);
    }


})

// ---------------------------------------sales team data--------------------



router.post('/sales', async(req, res) => {
    const { image, name, para } = req.body;

    if (!image || !name || !para) {
        return res.status(400).json({ error: 'Please provide all required field' });
    }

    try {
        const userExist = await Sales.findOne({ name: name });

        if (userExist) {
            return res.status(422).json({ error: "User already exists" });
        }

        const User = new Sales({ image, name, para });

        await User.save();

        res.status(201).json({ message: "Sales User registered successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to register" });
    }
});

router.get('/sales', async(req, res) => {
    try {
        // Retrieve all users from the database
        const users = await Sales.find();

        // Check if any users were found
        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        // If users were found, send them in the response
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});



// ---------------------------sales team ends-------------------


// ---------------------------------------operation team data--------------------



router.post('/operation', async(req, res) => {
    const { image, name, position, para } = req.body;

    if (!image || !name || !position || !para) {
        return res.status(400).json({ error: 'Please provide all required field' });
    }

    try {
        const userExist = await Opr.findOne({ name: name });

        if (userExist) {
            return res.status(422).json({ error: "User already exists" });
        }

        const User = new Opr({ image, name, position, para });

        await User.save();

        res.status(201).json({ message: "Sales User registered successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to register" });
    }
});

router.get('/operation', async(req, res) => {
    try {
        // Retrieve all users from the database
        const users = await Opr.find();

        // Check if any users were found
        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        // If users were found, send them in the response
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});



// ---------------------------operation team ends-------------------


// ---------------------------------------Managers team data--------------------



router.post('/manager', async(req, res) => {
    const { image, name, position, para } = req.body;

    if (!image || !name || !position || !para) {
        return res.status(400).json({ error: 'Please provide all required field' });
    }

    try {
        const userExist = await Manager.findOne({ name: name });

        if (userExist) {
            return res.status(422).json({ error: "User already exists" });
        }

        const User = new Manager({ image, name, position, para });

        await User.save();

        res.status(201).json({ message: "Sales User registered successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to register" });
    }
});

router.get('/manager', async(req, res) => {
    try {
        // Retrieve all users from the database
        const users = await Manager.find();

        // Check if any users were found
        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        // If users were found, send them in the response
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});



// ---------------------------Managers team ends-------------------


// ---------------------------------------Managers team data--------------------



router.post('/teacher', async(req, res) => {
    const { image, name, position, para } = req.body;

    if (!image || !name || !position || !para) {
        return res.status(400).json({ error: 'Please provide all required field' });
    }

    try {
        const userExist = await Teacher.findOne({ name: name });

        if (userExist) {
            return res.status(422).json({ error: "User already exists" });
        }

        const User = new Teacher({ image, name, position, para });

        await User.save();

        res.status(201).json({ message: "teacher User registered successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to register" });
    }
});

router.get('/teacher', async(req, res) => {
    try {
        // Retrieve all users from the database
        const users = await Teacher.find();

        // Check if any users were found
        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        // If users were found, send them in the response
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});



// ---------------------------Managers team ends-------------------

module.exports = router;