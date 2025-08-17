# Companion Module: KeyFree Companion

A Companion module for [KeyFree Companion](https://github.com/nerif-tafu/keyfree-companion) - a powerful keyboard automation tool with web API interface.

## Features

- **Single Key Press**: Send individual key presses
- **Key Combinations**: Support for 2, 3, and 4-key combinations
- **Key Down/Up Control**: Individual key press and release control
- **String Typing**: Type text strings with natural timing
- **Common Shortcuts**: Pre-configured actions for copy, paste, save, etc.
- **Connection Status**: Real-time feedback on connection status
- **Variables**: Track connection status, server URL, and last action

## Installation

1. Install the module in Companion
2. Configure the module with your KeyFree Companion server details
3. Ensure KeyFree Companion is running and accessible

## Configuration

### Required Settings

- **KeyFree Companion IP**: The IP address of your KeyFree Companion server (default: 127.0.0.1)
- **KeyFree Companion Port**: The port number of your KeyFree Companion server (default: 3000)

## Actions

### Basic Actions

- **Single Key Press**: Press a single key
- **Two-Key Combination**: Press two keys simultaneously
- **Three-Key Combination**: Press three keys simultaneously
- **Four-Key Combination**: Press four keys simultaneously
- **Key Down**: Hold down a key
- **Key Up**: Release a key
- **Type String**: Type a text string

## Feedbacks

- **Connection Status**: Green when connected to KeyFree Companion
- **Connection Failure**: Red when connection fails

## Variables

- **Connection Status**: Current connection status (Connected/Disconnected/Failed/Error)
- **Server URL**: The configured server URL
- **Last Action**: The last action executed
- **Last Error**: The last error message (if any)

## Supported Keys

### Letters
- `a` through `z`

### Numbers
- `0` through `9`

### Function Keys
- `f1` through `f12`

### Modifier Keys
- `ctrl`, `left_ctrl`, `right_ctrl`
- `shift`, `left_shift`, `right_shift`
- `alt`, `left_alt`, `right_alt`
- `meta`, `left_meta`, `right_meta` (Windows/Cmd)

### Special Keys
- `enter`, `space`, `tab`, `escape`
- `backspace`, `delete`, `insert`
- `home`, `end`, `pageup`, `pagedown`
- Arrow keys: `up`, `down`, `left`, `right`

### Punctuation and Symbols
- All common punctuation and symbols

## Examples

### Basic Usage

1. **Copy Text**: Use the "Copy (Ctrl+C)" action
2. **Paste Text**: Use the "Paste (Ctrl+V)" action
3. **Take Screenshot**: Use the "Screenshot" action

### Custom Key Combinations

1. **Custom Duo**: Use "Two-Key Combination" with your desired keys
2. **Custom Trio**: Use "Three-Key Combination" for complex shortcuts
3. **Type Custom Text**: Use "Type String" to type any text

### Advanced Usage

1. **Hold and Release**: Use "Key Down" followed by "Key Up" for precise control
2. **Custom Shortcuts**: Create your own key combinations for specific applications

## Troubleshooting

### Connection Issues

1. **Check KeyFree Companion**: Ensure KeyFree Companion is running
2. **Verify IP/Port**: Check that the IP and port are correct
3. **Test Connection**: Use the "Test Connection" action
4. **Check Firewall**: Ensure the port is not blocked by firewall

### Key Combination Issues

1. **Key Names**: Ensure you're using supported key names
2. **Modifier Keys**: Try using left/right specific modifiers if available
3. **Timing**: Some applications may require specific timing for key combinations

### Common Problems

- **Permission Issues**: KeyFree Companion may need accessibility permissions
- **Platform Differences**: Some shortcuts work differently on different operating systems
- **Application Conflicts**: Some applications may block or interfere with keyboard automation

## Security Considerations

⚠️ **Warning**: This module provides low-level keyboard control. Use responsibly:

- Only run on trusted systems
- Be aware that it can simulate any keyboard input
- Consider firewall rules to restrict API access
- Use authentication if deploying in production

## Development

### Building

```bash
npm run package
```

### Testing

1. Start KeyFree Companion server
2. Configure the module with correct IP/port
3. Test various actions and feedbacks

## License

MIT License

## Support

For issues and questions:
- [KeyFree Companion Repository](https://github.com/nerif-tafu/keyfree-companion)
- [Companion Module Repository](https://github.com/nerif-tafu/companion-module-keyfree-companion)

## Changelog

### v0.1.0
- Initial release
- Basic keyboard automation support
- Connection status feedback
- Common shortcuts
- Variables for tracking
