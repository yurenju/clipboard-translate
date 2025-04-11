# Clipboard Translator

A simple command-line tool that translates text from your clipboard to a specified language using DeepL API.

## Features

- Translate text from clipboard to any supported language
- List all available languages
- Simple command-line interface
- Built with TypeScript
- System-wide configuration storage

## Installation

```bash
# Clone the repository
git clone https://github.com/yurenju/clipboard-translate.git
cd clipboard-translate

# Install dependencies
npm install
```

## Usage

### Configuration

Before using the translator, you need to set up your DeepL API key:

```bash
# Set your DeepL API key
npx tsx ./src/index.ts config set-api-key YOUR-API-KEY

# View current API key
npx tsx ./src/index.ts config show-api-key
```

### Translate Text

To translate text from your clipboard to a specific language:

```bash
npx tsx ./src/index.ts translate <target-language>
```

Example:
```bash
# Translate to Traditional Chinese
npx tsx ./src/index.ts translate zh-TW

# Translate from Japanese to English
npx tsx ./src/index.ts translate en-US -f ja
```

### List Available Languages

To see all available languages:

```bash
npx tsx ./src/index.ts languages
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

2. Run commands:
```bash
# For translation
npx tsx ./src/index.ts translate <target-language>

# For listing languages
npx tsx ./src/index.ts languages

# For configuration
npx tsx ./src/index.ts config set-api-key YOUR-API-KEY
npx tsx ./src/index.ts config show-api-key
```

## License

MIT 