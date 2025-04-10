# Clipboard Translator

A simple command-line tool that translates text from your clipboard to a specified language using Google Translate.

## Features

- Translate text from clipboard to any supported language
- List all available languages
- Simple command-line interface
- Built with TypeScript

## Installation

```bash
# Clone the repository
git clone https://github.com/yurenju/clipboard-translate.git
cd clipboard-translate

# Install dependencies
npm install

# Build the project
npm run build
```

## Usage

### Translate Text

To translate text from your clipboard to a specific language:

```bash
clipboard-translate translate <target-language>
```

Example:
```bash
clipboard-translate translate zh-TW
```

### List Available Languages

To see all available languages:

```bash
clipboard-translate languages
```

## Development

### Prerequisites

- Node.js (v20 or higher)
- npm

### Setup

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

3. Run in development mode:
```bash
# For translation
npm run dev translate <target-language>

# For listing languages
npm run dev languages
```

## License

MIT 