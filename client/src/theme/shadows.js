// @mui
import { alpha } from '@mui/material/styles';
//
import palette from './palette';

// ----------------------------------------------------------------------

// Using grey[500] as the base color for shadows
const color = palette.grey[500];

export default function shadows() {
  // Creating three levels of transparency for the shadow layers
  // These create depth through different opacity levels
  const transparent1 = alpha(color, 0.2);  // Ambient shadow
  const transparent2 = alpha(color, 0.14); // Penumbra shadow
  const transparent3 = alpha(color, 0.12); // Umbra shadow

  return [
    'none', // Index 0: No shadow
    // Each array element represents a different elevation level (1-24)
    // Format: `${y-offset}px ${x-offset}px ${blur-radius}px ${spread-radius}px ${color}`
    // Three layers per shadow: ambient, penumbra, and umbra
    `0px 2px 1px -1px ${transparent1},0px 1px 1px 0px ${transparent2},0px 1px 3px 0px ${transparent3}`, // Elevation 1
    `0px 3px 1px -2px ${transparent1},0px 2px 2px 0px ${transparent2},0px 1px 5px 0px ${transparent3}`, // Elevation 2
    `0px 3px 3px -2px ${transparent1},0px 3px 4px 0px ${transparent2},0px 1px 8px 0px ${transparent3}`, // Elevation 3
    `0px 2px 4px -1px ${transparent1},0px 4px 5px 0px ${transparent2},0px 1px 10px 0px ${transparent3}`, // Elevation 4
    `0px 3px 5px -1px ${transparent1},0px 5px 8px 0px ${transparent2},0px 1px 14px 0px ${transparent3}`, // Elevation 5
    `0px 3px 5px -1px ${transparent1},0px 6px 10px 0px ${transparent2},0px 1px 18px 0px ${transparent3}`, // Elevation 6
    `0px 4px 5px -2px ${transparent1},0px 7px 10px 1px ${transparent2},0px 2px 16px 1px ${transparent3}`, // Elevation 7
    `0px 5px 5px -3px ${transparent1},0px 8px 10px 1px ${transparent2},0px 3px 14px 2px ${transparent3}`, // Elevation 8
    `0px 5px 6px -3px ${transparent1},0px 9px 12px 1px ${transparent2},0px 3px 16px 2px ${transparent3}`, // Elevation 9
    `0px 6px 6px -3px ${transparent1},0px 10px 14px 1px ${transparent2},0px 4px 18px 3px ${transparent3}`, // Elevation 10
    `0px 6px 7px -4px ${transparent1},0px 11px 15px 1px ${transparent2},0px 4px 20px 3px ${transparent3}`, // Elevation 11
    `0px 7px 8px -4px ${transparent1},0px 12px 17px 2px ${transparent2},0px 5px 22px 4px ${transparent3}`, // Elevation 12
    `0px 7px 8px -4px ${transparent1},0px 13px 19px 2px ${transparent2},0px 5px 24px 4px ${transparent3}`, // Elevation 13
    `0px 7px 9px -4px ${transparent1},0px 14px 21px 2px ${transparent2},0px 5px 26px 4px ${transparent3}`, // Elevation 14
    `0px 8px 9px -5px ${transparent1},0px 15px 22px 2px ${transparent2},0px 6px 28px 5px ${transparent3}`, // Elevation 15
    `0px 8px 10px -5px ${transparent1},0px 16px 24px 2px ${transparent2},0px 6px 30px 5px ${transparent3}`, // Elevation 16
    `0px 8px 11px -5px ${transparent1},0px 17px 26px 2px ${transparent2},0px 6px 32px 5px ${transparent3}`, // Elevation 17
    `0px 9px 11px -5px ${transparent1},0px 18px 28px 2px ${transparent2},0px 7px 34px 6px ${transparent3}`, // Elevation 18
    `0px 9px 12px -6px ${transparent1},0px 19px 29px 2px ${transparent2},0px 7px 36px 6px ${transparent3}`, // Elevation 19
    `0px 10px 13px -6px ${transparent1},0px 20px 31px 3px ${transparent2},0px 8px 38px 7px ${transparent3}`, // Elevation 20
    `0px 10px 13px -6px ${transparent1},0px 21px 33px 3px ${transparent2},0px 8px 40px 7px ${transparent3}`, // Elevation 21
    `0px 10px 14px -6px ${transparent1},0px 22px 35px 3px ${transparent2},0px 8px 42px 7px ${transparent3}`, // Elevation 22
    `0px 11px 14px -7px ${transparent1},0px 23px 36px 3px ${transparent2},0px 9px 44px 8px ${transparent3}`, // Elevation 23
    `0px 11px 15px -7px ${transparent1},0px 24px 38px 3px ${transparent2},0px 9px 46px 8px ${transparent3}`, // Elevation 24
  ];
}
