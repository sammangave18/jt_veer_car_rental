const multer = require('multer');
const path = require('path');
const fs = require('fs').promises; // Use fs.promises for asynchronous file operations

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    // Make sure the folder exists where images will be stored
    const folderPath = path.join(__dirname, '../uploads');  // Ensure this path is correct
    console.log(`Creating directory at: ${folderPath}`); // Log to ensure folder path is correct

    try {
      // Create the folder if it doesn't exist
      await fs.mkdir(folderPath, { recursive: true }); // Ensure all parent directories are created
      console.log(`Directory created or already exists at: ${folderPath}`);
      cb(null, folderPath);
    } catch (err) {
      console.error('Error creating folder:', err);  // Log error if any
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    const employeeName = req.body.name || 'employee'; // Default to 'employee' if not provided
    const employeeId = req.body.employeeNumber || 'default'; // Default to 'default' if employeeNumber is not provided
    const fileExtension = path.extname(file.originalname); // Get the file extension
    console.log(`Uploading file: ${employeeName}_${employeeId}_profilePic${fileExtension}`); // Log filename

    // Use employee name and ID in the filename
    cb(null, `${employeeName}_${employeeId}_profilePic${fileExtension}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
