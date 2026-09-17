import dualImage1 from "@/assets/products/dual-channel/1.jpg";
import dualImage2 from "@/assets/products/dual-channel/2.jpg";
import dualImage3 from "@/assets/products/dual-channel/3.jpg";
import keyringImage1 from "@/assets/products/keyring/1.jpg";
import keyringImage2 from "@/assets/products/keyring/2.jpg";
import multiChannelImage1 from "@/assets/products/multi-channel/1.jpg";
import multiChannelImage2 from "@/assets/products/multi-channel/2.jpg";
import multiChannelImage3 from "@/assets/products/multi-channel/3.jpg";
import multiChannelImage4 from "@/assets/products/multi-channel/4.jpg";
import multiChannelImage5 from "@/assets/products/multi-channel/5.jpg";
import singleChannelImage1 from "@/assets/products/single-channel/1.jpg";
import singleChannelImage2 from "@/assets/products/single-channel/2.jpg";
import singleChannelImage3 from "@/assets/products/single-channel/3.jpg";
import smokeAlarmImage1 from "@/assets/products/smoke-alarm/1.jpg";

import dualDark1 from "@/assets/products/dual-channel/1-dark.jpeg";
import dualDark2 from "@/assets/products/dual-channel/2-dark.jpeg";
import dualDark3 from "@/assets/products/dual-channel/3-dark.jpeg";
import keyringDark1 from "@/assets/products/keyring/1-dark.jpeg";
import keyringDark2 from "@/assets/products/keyring/2-dark.jpeg";
import multiChannelDark1 from "@/assets/products/multi-channel/1-dark.jpeg";
import multiChannelDark2 from "@/assets/products/multi-channel/2-dark.jpeg";
import multiChannelDark3 from "@/assets/products/multi-channel/3-dark.jpeg";
import multiChannelDark4 from "@/assets/products/multi-channel/4-dark.jpeg";
import multiChannelDark5 from "@/assets/products/multi-channel/5-dark.jpeg";
import singleChannelDark1 from "@/assets/products/single-channel/1-dark.jpeg";
import singleChannelDark2 from "@/assets/products/single-channel/2-dark.jpeg";
import singleChannelDark3 from "@/assets/products/single-channel/3-dark.jpeg";
import smokeAlarmDark1 from "@/assets/products/smoke-alarm/1-dark.jpeg";

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  images?: string[];
  darkImages?: string[];
  features: string[];
  specifications: Record<string, string>;
  compatibility: string[];
  category: string;
}

export const products: Product[] = [
  {
    id: "single-channel-receiver-switch",
    name: "Single Channel Receiver Switch",
    shortDescription: "Single roller shutter control with 3-button open/stop/close operation.",
    description:
      "Single roller shutter control. 3 button operation open/stop/close.",
    images: [singleChannelImage1, singleChannelImage2, singleChannelImage3],
    darkImages: [singleChannelDark1, singleChannelDark2, singleChannelDark3],
    features: [
      "Simple press buttons",
      "Compatible with remote controls",
      "Compatible with keyring remote controls",
      "Compatible with smoke detector",
    ],
    specifications: {
      Model: "AC304",
      "Input voltage": "AC230V/50 HZ ± 20%, AC120V/60 HZ ± 20%",
      "Receiving frequency": "433.92 MHz",
      "Receiving sensitivity": "≤107dB",
      "Output power": "≤500W",
      "Working temperature": "-40°C~+70°C",
      Size: "86x86x34mm",
      Warranty: "12 months",
    },
    compatibility: [
      "Electric roller shutters",
      "Roller blinds",
      "Outdoor blinds",
      "Awnings",
      "Motorized curtains",
    ],
    category: "Receiver Switches",
  },
  {
    id: "dual-channel-receiver-switch",
    name: "Dual Channel Receiver Switch",
    shortDescription: "Double roller shutter control with 3-button open/stop/close operation.",
    description:
      "Double roller shutter control. 3 button operation open/stop/close.",
    images: [dualImage1, dualImage2, dualImage3],
    darkImages: [dualDark1, dualDark2, dualDark3],
    features: [
      "Simple press buttons",
      "Compatible with remote controls",
      "Compatible with keyring remote controls",
      "Compatible with smoke detector",
    ],
    specifications: {
      Model: "AC305",
      "Input voltage": "AC230V/50 HZ ± 20%, AC120V/60 HZ ± 20%",
      "Receiving frequency": "433.92 MHz",
      "Receiving sensitivity": "≤107dB",
      "Output power": "≤2*500W",
      "Working temperature": "-40°C~+70°C",
      Size: "86x86x34mm",
      Warranty: "12 months",
    },
    compatibility: [
      "Electric roller shutters",
      "Roller blinds",
      "Outdoor blinds",
      "Awnings",
      "Motorized curtains",
    ],
    category: "Receiver Switches",
  },
  {
    id: "rf-multi-channel-transmitter",
    name: "RF Multi Channel Transmitter",
    shortDescription:
      "Multi channel roller shutter control with open/stop/close and master all-channel control.",
    description:
      "Multi channel roller shutter control + 3 button operation open/stop/close + Multi selection channels or master channel to control all.",
    images: [multiChannelImage1, multiChannelImage2, multiChannelImage3, multiChannelImage4, multiChannelImage5],
    darkImages: [multiChannelDark1, multiChannelDark2, multiChannelDark3, multiChannelDark4, multiChannelDark5],
    features: [
      "Simple press buttons",
      "Clear easy to read display",
      "16 channels",
      "Customise maximum channel display",
    ],
    specifications: {
      Model: "AC123-16",
      Frequency: "433.92 MHz",
      "Working temperature": "-20°C~55°C",
      Size: "124x40x11mm",
      Battery: "CR2430",
      Warranty: "12 months",
    },
    compatibility: [
      "Single channel receiver switches",
      "Dual channel receiver switches",
      "RF motors",
    ],
    category: "Transmitters",
  },
  {
    id: "keyring-remote-control",
    name: "Keyring Remote Control",
    shortDescription:
      "3-button open/stop/close remote with multi-channel programming support.",
    description:
      "3 button operation open/stop/close + multi channel programming to Single and Dual channel receiver switches.",
    images: [keyringImage1, keyringImage2],
    darkImages: [keyringDark1, keyringDark2],
    features: [
      "Simple press buttons",
      "Compact size",
      "Ideal for multiple family members and or employees",
      "Operate individual or multiple roller shutters",
    ],
    specifications: {
      Model: "AC116",
      Frequency: "433.92 MHz",
      "Transmit Power": "≤10mW",
      "Working temperature": "-20°C~55°C",
      Size: "55x30x13mm",
      Battery: "CR2032",
    },
    compatibility: [
      "Single channel receiver switches",
      "Dual channel receiver switches",
      "RF motors",
    ],
    category: "Remote Controls",
  },
  {
    id: "rf-smoke-detector-transmitter",
    name: "RF Smoke Detector Transmitter",
    shortDescription:
      "Wireless smoke alarm transmitter that signals receiver switches to open roller shutters when detector triggers.",
    description:
      "The wireless smoke alarm sends a signal to the Single and Dual channel receiver switches that control the roller shutters. When a fire occurs, the smoke alarm triggers an alarm, and then sends a radio signal to the receiver switches to open the roller shutters.",
    images: [smokeAlarmImage1],
    darkImages: [smokeAlarmDark1],
    features: [
      "Standard smoke alarm operation",
      "Installed next to existing smoke alarms (Not a replacement for existing hard-wired smoke alarms)",
    ],
    specifications: {
      Model: "AC104",
      Frequency: "433.92 MHz",
      "Working temperature": "-40°C~85°C",
      Size: "110x110x32mm",
      Battery: "9V DC",
    },
    compatibility: [
      "Single channel receiver switches",
      "Dual channel receiver switches",
    ],
    category: "Safety",
  },
];
