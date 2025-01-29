import express from "express";
import bodyParser from "body-parser";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

let jsonData = `[
  {
    "id": "0001",
    "category": "Robot",
    "model": "Assembler Bot",
    "price": 1999.99,
    "specifications": {
      "cpu": {
        "type": "Quad-Core Processor",
        "assembly": "High-Speed Soldered"
      },
      "control_panel": {
        "type": "AI Control Panel",
        "complexity": "Advanced"
      },
      "components": [
        {
          "module": "Vision System",
          "quantity": "1 unit",
          "parts": ["High-Resolution Camera"]
        },
        {
          "module": "Gripping Arm",
          "quantity": "2 units",
          "parts": ["Mechanical Claw", "Hydraulic Actuator"]
        },
        {
          "module": "Mobility Module",
          "quantity": "4 wheels",
          "parts": ["All-Terrain Wheels", "Servo Motor", "Suspension"]
        },
        {
          "module": "Energy Pack",
          "quantity": "1 unit",
          "parts": ["Lithium-Ion Battery", "Charging Port"]
        }
      ]
    }
  },
  {
    "id": "0002",
    "category": "Robot",
    "model": "Welding Bot",
    "price": 2999.49,
    "specifications": {
      "cpu": {
        "type": "Hex-Core Processor",
        "assembly": "Precision Assembled"
      },
      "control_panel": {
        "type": "Touchscreen Panel",
        "complexity": "High"
      },
      "components": [
        {
          "module": "Temperature Sensor",
          "quantity": "1 unit",
          "parts": ["Infrared Sensor", "Thermal Shield"]
        },
        {
          "module": "Welding Arm",
          "quantity": "1 unit",
          "parts": ["Plasma Torch", "Arm Extender"]
        },
        {
          "module": "Safety Shield",
          "quantity": "1 unit",
          "parts": ["Protective Glass", "Heat Resistant Material"]
        }
      ]
    }
  },
  {
    "id": "0003",
    "category": "Robot",
    "model": "Inspection Drone",
    "price": 3999.99,
    "specifications": {
      "cpu": {
        "type": "Octa-Core Processor",
        "assembly": "High-Frequency Tuning"
      },
      "control_panel": {
        "type": "Remote-Controlled UI",
        "complexity": "Intermediate"
      },
      "components": [
        {
          "module": "Camera Module",
          "quantity": "1 unit",
          "parts": [
            "4K Camera",
            "Wide-Angle Lens",
            "Gyroscope"
          ]
        },
        {
          "module": "Navigation System",
          "quantity": "1 unit",
          "parts": ["GPS Module", "Compass", "Altitude Sensor"]
        },
        {
          "module": "Battery Pack",
          "quantity": "1 unit",
          "parts": ["High-Capacity Battery", "Charging Dock"]
        }
      ]
    }
  }
]`;

// Configure view engine before routes
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files - add multiple static paths
app.use(express.static('public'));
app.use('/styles', express.static(path.join(__dirname, 'public/styles')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended:true}));

let roboData;

app.get('/',(_ , res) => {
    res.render('index.ejs' , {
        accessKey : roboData,
    });
});

app.post('/generate', (req ,res) => {
    try {
        switch (req.body.getList) {
            case 'Assembler Bot':
                roboData = JSON.parse(jsonData)[0];
                break;
            case 'Welding Bot':
                roboData = JSON.parse(jsonData)[1];
                break;
            case 'Inspection Drone':
                roboData = JSON.parse(jsonData)[2];
                break;
            default:
                console.log('Oops! Something went wrong.');
                break;
        }
        res.redirect('/');
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port , () => {
    console.log(`Server is listening on port ${port}`);
});