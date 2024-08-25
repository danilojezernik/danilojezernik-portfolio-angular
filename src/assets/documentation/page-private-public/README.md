# Project Architecture

This document provides an overview of the architecture and organization of the files and directories in this Angular project.

## Directory Structure

```plaintext
src/
├── app/
│   ├── auth/
│   │   ├── auth.service.ts
│   │   ├── auth-guard.service.ts
│   ├── core/
│   │   ├── footer/
│   │   │   ├── footer.component.html
│   │   │   ├── footer.component.ts
│   │   ├── header/
│   │   │   ├── header.component.html
│   │   │   ├── header.component.ts
│   ├── pages/
│   │   ├── private/
│   │   │   ├── admin/
│   │   │   │   ├── admin.component.html
│   │   │   │   ├── admin.component.ts
│   │   │   ├── blog/
│   │   │   │   ├── add-blog-admin/
│   │   │   │   │   ├── add-blog-admin.component.html
│   │   │   │   │   ├── add-blog-admin.component.ts
│   │   │   │   ├── blog-all-admin/
│   │   │   │   │   ├── blog-all-admin.component.html
│   │   │   │   │   ├── blog-all-admin.component.ts
│   │   │   │   ├── blog-edit-by-id-admin/
│   │   │   │   │   ├── blog-edit-by-id-admin.component.html
│   │   │   │   │   ├── blog-edit-by-id-admin.component.ts
│   │   │   ├── emails-admin/
│   │   │   │   ├── emails-admin.component.html
│   │   │   │   ├── emails-admin.component.ts
│   │   │   ├── experiences-admin/
│   │   │   │   ├── add-experiences-admin/
│   │   │   │   │   ├── add-experiences-admin.component.html
│   │   │   │   │   ├── add-experiences-admin.component.ts
│   │   │   │   ├── all-experiences-admin/
│   │   │   │   │   ├── all-experiences-admin.component.html
│   │   │   │   │   ├── all-experiences-admin.component.ts
│   │   │   │   ├── edit-experiences-admin/
│   │   │   │   │   ├── edit-experiences-admin.component.html
│   │   │   │   │   ├── edit-experiences-admin.component.ts
│   │   │   ├── links/
│   │   │   │   ├── add-links/
│   │   │   │   │   ├── add-links.component.html
│   │   │   │   │   ├── add-links.component.ts
│   │   │   │   ├── all-links/
│   │   │   │   │   ├── all-links.component.html
│   │   │   │   │   ├── all-links.component.ts
│   │   │   │   ├── edit-links/
│   │   │   │   │   ├── edit-links.component.html
│   │   │   │   │   ├── edit-links.component.ts
│   │   │   ├── projects-admin/
│   │   │   │   ├── project-add-admin/
│   │   │   │   │   ├── project-add-admin.component.html
│   │   │   │   │   ├── project-add-admin.component.ts
│   │   │   │   ├── project-edit-admin/
│   │   │   │   │   ├── project-edit-admin.component.html
│   │   │   │   │   ├── project-edit-admin.component.ts
│   │   │   │   ├── projects-all-admin/
│   │   │   │   │   ├── projects-all-admin.component.html
│   │   │   │   │   ├── projects-all-admin.component.ts
│   │   │   ├── technology/
│   │   │   │   ├── add-technology/
│   │   │   │   │   ├── add-technology.component.html
│   │   │   │   │   ├── add-technology.component.ts
│   │   │   │   ├── all-technology/
│   │   │   │   │   ├── all-technology.component.html
│   │   │   │   │   ├── all-technology.component.ts
│   │   │   │   ├── edit-technology/
│   │   │   │   │   ├── edit-technology.component.html
│   │   │   │   │   ├── edit-technology.component.ts
│   │   │   ├── users-admin/
│   │   │   │   ├── user-add-admin/
│   │   │   │   │   ├── user-add-admin.component.html
│   │   │   │   │   ├── user-add-admin.component.ts
│   │   │   │   ├── user-edit-by-id-admin/
│   │   │   │   │   ├── user-edit-by-id-admin.component.html
│   │   │   │   │   ├── user-edit-by-id-admin.component.ts
│   │   │   │   ├── users-all-admin/
│   │   │   │   │   ├── users-all-admin.component.html
│   │   │   │   │   ├── users-all-admin.component.ts
│   │   ├── public/
│   │   │   ├── biography/
│   │   │   │   ├── biography.component.html
│   │   │   │   ├── biography.component.ts
│   │   │   ├── blog/
│   │   │   │   ├── blog-all/
│   │   │   │   │   ├── blog-all.component.html
│   │   │   │   │   ├── blog-all.component.ts
│   │   │   │   ├── blog-by-id/
│   │   │   │   │   ├── blog-by-id.component.html
│   │   │   │   │   ├── blog-by-id.component.ts
│   │   │   ├── book/
│   │   │   │   ├── book.component.html
│   │   │   │   ├── book.component.scss
│   │   │   │   ├── book.component.ts
│   │   │   ├── contact/
│   │   │   │   ├── contact.component.html
│   │   │   │   ├── contact.component.ts
│   │   │   ├── experiences/
│   │   │   │   ├── experiences.component.html
│   │   │   │   ├── experiences.component.ts
│   │   │   ├── github/
│   │   │   │   ├── github.component.html
│   │   │   │   ├── github.component.ts
│   │   │   ├── home/
│   │   │   │   ├── home.component.html
│   │   │   │   ├── home.component.scss
│   │   │   │   ├── home.component.spec.ts
│   │   │   │   ├── home.component.ts
│   │   │   ├── links/
│   │   │   │   ├── links.component.html
│   │   │   │   ├── links.component.ts
│   │   │   ├── login/
│   │   │   │   ├── login.component.html
│   │   │   │   ├── login.component.ts
│   │   │   ├── media/
│   │   │   │   ├── media.component.html
│   │   │   │   ├── media-admin.component.ts
│   │   │   ├── not-found/
│   │   │   │   ├── not-found.component.html
│   │   │   │   ├── not-found.component.ts
│   │   │   ├── projects/
│   │   │   │   ├── projects.component.html
│   │   │   │   ├── projects.component.ts
│   │   │   ├── register-user/
│   │   │   │   ├── register-user.component.html
│   │   │   │   ├── register-user.component.ts
│   │   │   ├── technology/
│   │   │   │   ├── technology-all/
│   │   │   │   │   ├── technology-all.component.html
│   │   │   │   │   ├── technology-all.component.ts
│   │   │   │   ├── technology-by-id/
│   │   │   │   │   ├── technology-by-id.component.html
│   │   │   │   │   ├── technology-by-id.component.ts
│   │   │   ├── users/
│   │   │   │   ├── user-by-id/
│   │   │   │   │   ├── user-by-id.component.html
│   │   │   │   │   ├── user-by-id.component.ts
│   │   │   │   ├── users-all/
│   │   │   │   │   ├── users.component.html
│   │   │   │   │   ├── users.component.ts
│   ├── directives/
│   │   ├── copyright.directive.spec.ts
│   │   ├── copyright.directive.ts
│   ├── interceptors/
│   │   ├── http-error-interceptor/
│   │   │   ├── http-error.interceptor.spec.ts
│   │   │   ├── http-error.interceptor.ts
│   │   ├── http-service-interceptor/
│   │   │   ├── interceptor.service.ts
│   ├── models/
│   │   ├── blog.model.ts
│   │   ├── comment.ts
│   │   ├── contact.ts
│   │   ├── experiences.ts
│   │   ├── form-field-config.model.ts
│   │   ├── github.model.ts
│   │   ├── links.ts
│   │   ├── logs.ts
│   │   ├── newsletter.ts
│   │   ├── projects.ts
│   │   ├── subscriber.ts
│   │   ├── technology.ts
│   │   ├── user.ts
│   ├── services/
│   │   ├── api/
│   │   │   ├── blog.service.ts
│   │   │   ├── contact.service.ts
│   │   │   ├── experiences.service.ts
│   │   │   ├── github.service.ts
│   │   │   ├── links.service.ts
│   │   │   ├── log-frontend.service.ts
│   │   │   ├── logs.service.ts
│   │   │   ├── projects.service.ts
│   │   │   ├── register.service.ts
│   │   │   ├── technology.service.ts
│   │   │   ├── users.service.ts
│   │   ├── communication/
│   │   │   ├── data-update.service.ts
│   │   │   ├── logged-in.service.ts
│   │   ├── dialog/
│   │   │   ├── get-device/
│   │   │   │   ├── get-device.service.ts
│   ├── shared/
│   │   ├── components/
│   │   │   ├── dialogs/
│   │   │   │   ├── dialog-global-admin/
│   │   │   │   │   ├── dialog-global-admin.component.html
│   │   │   │   │   ├── dialog-global-admin.component.ts
│   │   │   ├── go-back/
│   │   │   │   ├── go-back.component.html
│   │   │   │   ├── go-back.component.ts
│   │   │   ├── show-data/
│   │   │   │   ├── show-data.component.html
│   │   │   │   ├── show-data.component.ts
│   │   ├── forms/
│   │   │   ├── reusable-form-add/
│   │   │   │   ├── reusable-form-add.component.html
│   │   │   │   ├── reusable-form-add.component.ts
│   │   │   ├── reusable-form-edit/
│   │   │   │   ├── reusable-form-edit.component.html
│   │   │   │   ├── reusable-form-edit.component.ts
│   │   ├── global-const/
│   │   │   ├── form-config.ts
│   │   │   ├── global.const.ts
│   │   ├── utils/
│   │   │   ├── open-dialog.util.ts
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   ├── app.module.ts
│   ├── app-routing.module.ts
├── assets/
│   ├── documentation/
│   │   ├── add-logs
│   │   │   ├── README.md
│   │   ├── http-error-interceptor
│   │   │   ├── README.md
│   │   ├── ngx-translate
│   │   │   ├── README.md
│   │   ├── open-dialog-utils
│   │   │   ├── README.md
│   │   ├── page-private-public
│   │   │   ├── README.md
│   │   ├── reusable-form-add
│   │   │   ├── README.md
│   │   ├── reusable-form-edit
│   │   │   ├── README.md
│   │   ├── show-data
│   │   │   ├── README.md
│   │   ├── style-framework
│   │   │   ├── README.md
│   │   ├── documentation.txt
│   ├── i18n/
│   │   ├── en.json
│   │   ├── si.json
│   │   ├── .gitkeep
├── environments/
│   ├── environment.development.ts
│   ├── environment.prod.ts
│   ├── environment.ts
├── styles/
│   ├── abstract/
│   │   ├── mixin.scss
│   │   ├── variables.scss
│   ├── animation/
│   │   ├── spinner.scss
│   ├── components/
│   │   ├── spinner/
│   │   │   ├── spinner.scss
│   ├── global.scss
├── favicon.ico
├── index.html
├── main.ts
├── styles.scss
├── .editorconfig
├── .eslintrc.json
├── .gitignore
├── angular.json
├── package.json
├── package-lock.json
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json
```

## Directory Descriptions

### `app/`

This is the main application directory containing the core components, pages, services, and other functionalities.

- **`auth/`**: Contains services related to authentication, including `auth.service.ts` and `auth-guard.service.ts`.
- **`core/`**: Contains core layout components like `footer` and `header`.
- **`pages/`**: Contains all the page components, divided into `private` (admin) and `public` sections.

  - **`private/`**: Contains admin-related pages and components.
    - **`admin/`**: Admin dashboard component.
    - **`blog/`**: Components for managing blogs in the admin panel.
    - **`emails-admin/`**: Components for managing emails.
    - **`experiences-admin/`**: Components for managing experiences.
    - **`links/`**: Components for managing links.
    - **`projects-admin/`**: Components for managing projects.
    - **`technology/`**: Components for managing technologies.
    - **`users-admin/`**: Components for managing users.

  - **`public/`**: Contains public-facing pages and components.
    - **`biography/`**: Biography page component.
    - **`blog/`**: Public blog components.
    - **`book/`**: Book page component.
    - **`contact/`**: Contact page component.
    - **`experiences/`**: Experiences page component.
    - **`github/`**: GitHub page component.
    - **`home/`**: Home page component.
    - **`links/`**: Links page component.
    - **`login/`**: Login page component.
    - **`media/`**: Media page component.
    - **`not-found/`**: 404 Not Found page component.
    - **`projects/`**: Projects page component.
    - **`register-user/`**: User registration page component.
    - **`technology/`**: Technology page components.
    - **`users/`**: User page components.

### `directives/`

Contains custom Angular directives, such as `copyright.directive.ts`.

### `interceptors/`

Contains HTTP interceptors for handling errors and service requests, including `http-error.interceptor.ts` and `interceptor.service.ts`.

### `models/`

Defines TypeScript models used throughout the application, such as `blog.model.ts`, `comment.ts`, and `user.ts`.

### `services/`

Contains service files for API communication and other functionalities.

- **`api/`**: Services for API endpoints, like `blog.service.ts` and `users.service.ts`.
- **`communication/`**: Services for internal communication, like `data-update.service.ts` and `logged-in.service.ts`.
- **`dialog/`**: Services related to dialog operations, like `get-device.service.ts`.

### `shared/`

Contains shared components, forms, constants, and utility functions.

- **`components/`**: Reusable components such as `dialogs`, `go-back`, and `show-data`.
- **`forms/`**: Reusable form components like `reusable-form-add` and `reusable-form-edit`.
- **`global-const/`**: Global constants used across the application.
- **`utils/`**: Utility functions and services.

### `assets/`

Contains static assets like images and documentation files.

- **`i18n/`**: Internationalization files for different languages.
- **`documentation/`**: Markdown files for various documentation topics.

### `environments/`

Contains environment-specific configuration files.

### `styles/`

Contains global and component-specific styles.

- **`abstract/`**: Abstract style files like `mixin.scss` and `variables.scss`.
- **`animation/`**: Animation style files.
- **`components/`**: Component-specific style files.
- **`global.scss`**: Global styles applied throughout the application.
- **`styles.scss`**: Main stylesheet importing all other styles and Tailwind CSS.

### Root Files

- **`favicon.ico`**: Icon for the application.
- **`index.html`**: Main HTML file.
- **`main.ts`**: Main entry point for the Angular application.
- **`.editorconfig`**: Configuration for code editors.
- **`.eslintrc.json`**: ESLint configuration file.
- **`.gitignore`**: Specifies files to ignore in Git.
- **`angular.json`**: Angular workspace configuration file.
- **`package.json`**: Node.js dependencies and scripts.
- **`package-lock.json`**: Lockfile for Node.js dependencies.
- **`README.md`**: Project documentation.
- **`tailwind.config.js`**: Tailwind CSS configuration.
- **`tsconfig.app.json`**: TypeScript configuration for the app.
- **`tsconfig.json`**: Base TypeScript configuration.
- **`tsconfig.spec.json`**: TypeScript configuration for tests.
