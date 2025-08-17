# KeyFree Companion Module Help

This module integrates with [KeyFree Companion](https://github.com/nerif-tafu/keyfree-companion) to provide keyboard automation capabilities through Companion.

## Quick Start

1. **Install KeyFree Companion**: Follow the installation instructions at [KeyFree Companion Repository](https://github.com/nerif-tafu/keyfree-companion)
2. **Start KeyFree Companion**: Run `python main.py start` or `python main.py server`
3. **Configure this module**: Set the IP and port to match your KeyFree Companion server
4. **Test connection**: Use the "Test Connection" action to verify connectivity

## Configuration

### Required Settings

- **KeyFree Companion IP**: The IP address where KeyFree Companion is running (default: 127.0.0.1)
- **KeyFree Companion Port**: The port number for KeyFree Companion (default: 3000)

## Common Use Cases

### Basic Keyboard Control
- Use "Single Key Press" for individual keys
- Use "Two-Key Combination" for shortcuts like Ctrl+C
- Use "Type String" to type text

### Advanced Automation
- Use "Key Down" and "Key Up" for precise control
- Use "Three-Key Combination" for complex shortcuts
- Use "Four-Key Combination" for advanced macros

### Pre-configured Shortcuts
- Copy, Paste, Cut, Select All
- Save, Undo, Redo
- Screenshot (platform-specific)

## Troubleshooting

### Connection Issues
- Ensure KeyFree Companion is running
- Check IP and port settings
- Verify firewall settings
- Use "Test Connection" action

### Key Issues
- Use lowercase key names
- Check supported key list
- Try left/right specific modifiers if needed

## Supported Keys

See the main README for a complete list of supported keys.

## Security Note

This module provides low-level keyboard control. Use responsibly and only on trusted systems.
