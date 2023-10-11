# LMS Frontend

### Setup Instructions

1. Clone the project
```
    git clone ...
```

2. Move into the directory
```
    cd ls-frontend
```

3. Install dependencies
```
    npm i
```

4. Run the server
```
    npm run dev
```

### Setup Instructions for Tailwind

[Tailwind Official Instruction Doc] (https://tailwindcss.com/docs/installation)

1. Install tailwindcss
```
    npm install -D tailwindcss postcss autoprefixer
```

2. Create tailwind config file
```
    npx tailwindcss init -p
```

3. Add file extensions to tailwind config file in content property
```
    content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
```

4. Add the Tailwind directives to your `index.css`
```
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
```

5. Add the following details in the plugin property of tailwindcss config
```
    plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
```

### Adding plugins and dependencies

```
    npm install 
        @reduxjs/toolkit 
        react-router-dom 
        react-icons 
        react-chartjs-2 
        chart.js 
        daisyui 
        axios 
        react-hot-toast 
        @tailwindcss/line-clamp
```

### Configure auto import sort eslint

1. Install eslint plugin for import sorting
```
npm i -D eslint-plugin-simple-import-sort
```

2. Add rule in `eslint.cjs`
```
    'simple-import-sort/imports': 'error',
```

3. Add simple-import-sort plugin in `eslint.cjs`
```
    plugins: [..., 'simple-import-sort'],
```

4. To enable auto import sort on file save in vscode
    -open `setting.json`
    -add the following config
```
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
```