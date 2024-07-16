# Schematics for NestJS REST API resources

This package generates opinionated NestJS REST API resources. Key takeaways:

- Uses Prisma Service (`nestjs-prisma` needs to be installed separately)
  - Expects Prisma entities to have singular naming (e.g. User)
- Uses Zod for DTO Validation (`nestjs-zod` needs to be installed separately)
- Does not follow the NestJS naming convention (uses camelCase for the file names)

## Installation

```bash
npm i --save-dev nest-cmdn-schematics
```

# Usage

```bash
nest g -c nest-cmdn-schematics crud <Resource Name>
```

Or add npm alias

```json
  "scripts": {
    "gen": "nest g crud -c nest-cmdn-schematics"
  }
```

And then use

```bash
npm run gen <Resource Name>
```
