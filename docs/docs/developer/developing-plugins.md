---
id: developing-plugins
title: Create Plugin
sidebar_label: Create Plugin
---

With erxes, you can create your own plugins or extend the existing ones, which would help you to enhance your experience and increase your revenue by adding the value on your products/services or selling it on our **<a href="https://erxes.io/marketplace" target="_blank">our marketplace</a>**. This guideline will help you to develop your own plugins.

:::caution

- Before you start developing your own plugins, ensure there is no plugins with the same name or similar name in our marketplace that would bring any confusion as the name would be used many places starting from your `API`, `GraphQL`, `query`, `mutation`, etc.
- Name must be in small letters with no symbols and space in between.
- Name of All your `GraphQL` type, `query`, `mutation` must start with your plugin name.
- Names of your database collection also must start with your plugin name.
- Name of your **UIroutes** or `url`-s also must be start with you pluging name.

:::

## Installing erxes

---

Please go to **<a href="https://docs.erxes.io/docs/category/installation">the installation guideline</a>** to install erxes XOS, but no need to run the erxes with the same direction.

:::warning

We assume you've already installed erxes XOS on your device. Otherwise the guideline below would not work out properly. Please make sure you should be back after you install erxes XOS using **<a href="https://docs.erxes.io/docs/category/installation">the installation guideline</a>**.

:::

### Plugin API

Plugin development in API part requires the following software prerequisites to be already installed on your computer.

- **[Typescript](https://www.typescriptlang.org/)**
- **[GraphQL](https://graphql.org/graphql-js/)**
- **[Express.js](https://expressjs.com)**
- **[MongoDB](https://www.mongodb.com)**
- **[Redis](https://redis.io)**
- **[RabbitMQ](https://www.rabbitmq.com)**

### Plugin UI

Plugin development in UI part requires the following software prerequisites to be already installed on your computer.

- **[Typescript](https://www.typescriptlang.org/)**
- **[Webpack](https://webpack.js.org/)**
- **[ReactJS](https://reactjs.org)**

### Creating New Plugin

Each plugin is composed of two parts, `API` and `UI`

1. Create new folders for both using the following command.

```
cd erxes
yarn create-plugin
```

The command above starts CLI, prompting for few questions to create a new plugin as shown below.

<img src="https://erxes-docs.s3.us-west-2.amazonaws.com/create-plugin.gif" width ="100%"alt="CLI screenshot"></img>

The example below is a new plugin, created from an example template, placed at the main navigation.

<img src="https://demo-erxes.s3.amazonaws.com/plugin2.png" width ="100%"alt="CLI screenshot"></img>

Creating from an empty template will result in as shown below, as we give you the freedom and space to develop your own plugin on erxes.

<img src="https://demo-erxes.s3.amazonaws.com/plugin3.png" width ="100%"alt="CLI screenshot"></img>

## Running erxes

---

Please note that `create-plugin` command automatically adds a new line inside `cli/configs.json`, as well as installs the dependencies necessary.

```
{
	"jwt_token_secret": "token",
	"client_portal_domains": "",
	"elasticsearch": {},
	"redis": {
		"password": "pass"
	},
	"mongo": {
		"username": "",
		"password": ""
	},
	"rabbitmq": {
		"cookie": "",
		"user": "",
		"pass": "",
		"vhost": ""
	},
	"plugins": [
		{
	    "name": "new_plugin", "ui": "local"
		}
	]
}
```

2. Run the following command

```
cd erxes/cli
yarn install
```

3. Then run the following command to start erxes with your newly installed plugin

```
./bin/erxes.js dev
```

## Configuring UI

---

### Running port for plugin

Inside `packages/plugin-<new_plugin>-ui/src/configs.js`, running port for plugin UI is set as shown below. Default value is 3017. Please note that each plugin has to have its UI running on an unique port. You may need to change the port manually (inside `configs.js`) if developing multiple plugins.

```
module.exports = {
  name: 'new_plugin',
  port: 3017,
  scope: 'new_plugin',
  exposes: {
    './routes': './src/routes.tsx'
  },
  routes: {
    url: 'http://localhost:3017/remoteEntry.js',
    scope: 'new_plugin',
    module: './routes'
  },
  menus: []
};
```

### Location for plugin

Inside `packages/plugin-<new_plugin>-ui/src/configs.js`, we have a configuration section. The example below places new plugin at the main navigation menu.

```
menus: [
  {
    text: 'New plugin',
    url: '/new_plugins',
    icon: 'icon-star',
    location: 'mainNavigation',
  }
]
```

If you want to place it only inside settings, example is illustrated below.

```
menus: [
  {
    text: 'New plugin',
    to: '/new_plugins',
    image: '/images/icons/erxes-18.svg',
    location: 'settings',
    scope: 'new_plugin'
  }
]
```

### Enabling plugins

"plugins" section inside `cli/configs.json` contains plugin names that run when erxes starts. Please note to configure this section if you decide to enable other plugins, remove or recreate plugins.

```
{
 "jwt_token_secret": "token",
 "dashboard": {},
 "client_portal_domains": "",
 "elasticsearch": {},
 "redis": {
   "password": ""
 },
 "mongo": {
   "username": "",
   "password": ""
 },
 "rabbitmq": {
   "cookie": "",
   "user": "",
   "pass": "",
   "vhost": ""
 },
 "plugins": [
   {
     "name": "logs"
   },
   {
     "name": "new_plugin",
     "ui": "local"
   }
 ]
}

```

<!-- ### Installing dependencies using home brew

1. `redis`

````

brew update
brew install redis
brew services start redis

```

2. `rabbitmq`

```

brew update
brew install rabbitmq
brew services start rabbitmq

```

3. `mongodb`

```

brew tap mongodb/brew
brew update
brew install mongodb-community@5.0
brew services start mongodb-community@5.0

```

Here you have everything in hand to develop your own plugins. If you still have questions, please contact us through **<a href="https://github.com/erxes/erxes/discussionsGithub" target="_blank">our community discussion</a>** or start conversation on **<a href="https://discord.com/invite/aaGzy3gQK5" target="_blank" target="_blank">Discord</a>**! We are happy to help 🤗🤗🤗
```
```` -->

## Plugin API structure

After creating new plugin, the following files are generated automatically in your new plugin api. 

```
📦plugin-[pluginName]-api
 ┣ 📂src
 ┃ ┣ 📂graphql
 ┃ ┃ ┣ 📂resolvers
 ┃ ┃ ┃ ┣ index.ts
 ┃ ┃ ┃ ┣ mutations.ts
 ┃ ┃ ┃ ┣ queries.ts
 ┃ ┃ ┃ ┗ [pluginName].ts
 ┃ ┃ ┣ index.ts
 ┃ ┃ ┣ schema.ts
 ┃ ┃ ┗ typeDefs.ts
 ┃ ┣ 📂models
 ┃ ┃ ┣ 📂definitions
 ┃ ┃ ┃ ┣ [pluginName].ts
 ┃ ┃ ┃ ┗ utils.ts
 ┃ ┃ ┗ [pluginName].ts
 ┃ ┣ configs.ts
 ┃ ┣ connectionResolver.ts
 ┃ ┗ messageBroker.ts
 ┣ .env.sample
 ┣ package.json
 ┗ tsconfig.json
```

### Main files

Following files are generated automatically in plugin-[pluginName]-api/src.

#### configs.ts
This file contains main configuration of plugin-api. Such as server connections.

```ts showLineNumbers
// path: ./packages/plugin-[pluginName]-api/src/configs.ts 


// importing GraphQL typeDefs and resolvers
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

import { initBroker } from './messageBroker';
import { getSubdomain } from '@erxes/api-utils/src/core';
import { generateModels } from './connectionResolver';

export let mainDb;
export let debug;
export let graphqlPubsub;
export let serviceDiscovery;

export default {
  // your plugin name will show on name field
  name: [pluginName],

  // GraphQL connection of the plugin
  graphql: async sd => {
    serviceDiscovery = sd;

    return {
      typeDefs: await typeDefs(sd),
      resolvers: await resolvers(sd)
    };
  },

  // GraphQL context data
  apolloServerContext: async (context, req) => {
    const subdomain = getSubdomain(req);
    const models = await generateModels(subdomain);

    context.subdomain = req.hostname;
    context.models = models;

    return context;
  },

  // Server initializing
  onServerInit: async options => {
    mainDb = options.db;

    // Connecting with message broker
    initBroker(options.messageBrokerClient);

    graphqlPubsub = options.pubsubClient; 

    debug = options.debug;


    // If your plugin needed REST-API request you can write here.
    const { app } = options;

    app.get('/templates', async (req, res) => {
      res.send({
        status: 'success'
      })
    });
  }
};
```

#### messageBroker.ts
This file uses for connect with other plugins.

```ts showLineNumbers

// path: ./packages/plugin-[pluginName]-api/src/messageBroker.ts 

import { ISendMessageArgs, sendMessage } from "@erxes/api-utils/src/core";
import { serviceDiscovery } from "./configs";
import { generateModels } from "./connectionResolver";

let client;

export const initBroker = async cl => {
  client = cl;

  const { consumeQueue, consumeRPCQueue } = client;

  consumeQueue('[pluginName]:send', async ({ subdomain, data }) => {
    const models = await generateModels(subdomain);
    models.{modelName}.send(data);

    return {
      status: 'success',
    };
  });

  consumeRPCQueue('[pluginName}:find', async ({ subdomain, data }) => {
    const models = await generateModels(subdomain);

    return {
      status: 'success',
      data: await models.(modelName).find({})
    };
  });
};


export const sendCommonMessage = async (
  args: ISendMessageArgs & { serviceName: string }
) => {
  return sendMessage({
    serviceDiscovery,
    client,
    ...args
  });
};

export default function() {
  return client;
}
```




### GraphQL development

Inside `packages/plugin-<new_plugin>-api/src`, we have a <code>graphql</code> folder. The folder contains code related to GraphQL.

```
 📂src
 ┣ 📂graphql
 ┃ ┣ 📂resolvers
 ┃ ┃ ┣ index.ts
 ┃ ┃ ┣ mutations.ts
 ┃ ┃ ┣ queries.ts
 ┃ ┃ ┗ [pluginName].ts
 ┃ ┣ index.ts
 ┃ ┣ schema.ts
 ┃ ┗ typeDefs.ts
```

#### GraphQL resolvers

Inside `/graphql/resolvers/mutations` GraphQL mutation codes. 

<details>
  <summary>Click to see mutation examples:</summary>

  ```ts showLineNumbers
    import { IContext } from '../../connectionResolver';
    import {
      checkPermission,
      requireLogin
    } from '@erxes/api-utils/src/permissions';
    import { ITemplate } from '../../models/definitions/template';
    import { putUpdateLog } from '@erxes/api-utils/src/logUtils';
    import messageBroker from '../../messageBroker';

    interface ITemplateEdit extends ITemplate {
      _id: string;
    }

    const templateMutations = {
      /**
       * Creates a new template
       */
      async templatesAdd(_root, doc: ITemplate, { models }: IContext) {
        const template = await models.Templates.createTemplate(doc);

        return template;
      },
      /**
       * Edits a new template
       */
      async templatesEdit(
        _root,
        { _id, ...doc }: ITemplateEdit,
        { models, subdomain, user }: IContext
      ) {
        const template = await models.Templates.getTemplate(_id);
        const updated = await models.Templates.updateTemplate(_id, doc);

        // write log
        await putUpdateLog(
          subdomain,
          messageBroker(),
          { type: 'template', object: template, newData: doc },
          user
        );

        return updated;
      },
      /**
       * Removes a single template
       */
      async templatesRemove(_root, { _id }, { models }: IContext) {
        const template = await models.Templates.removeTemplate(_id);
        return template;
      },
    };

    // checking user logged or not
    requireLogin(templateMutations, 'templatesAdd');

    // checking permission
    checkPermission(templateMutations, 'templatesAdd', 'templatesAdd');

    export default templateMutations;

  ```

</details>

Inside `/graphql/resolvers/queries` folder contains GraphQL query codes. 

<details>
  <summary>Click to see query examples:</summary>

  ```ts showLineNumbers
    import { IContext } from '../../connectionResolver';

    const templateQueries = {
      templates(
        _root,
        {
          typeId,
          searchValue,
          templateIds
        }: { typeId: string; searchValue?: string; templateIds?: string[] },
        { models, commonQuerySelector }: IContext
      ) {
        const selector: any = { ...commonQuerySelector };
        if (typeId) {
          selector.typeId = typeId;
        }

        if (searchValue) {
          selector.name = new RegExp(`.*${searchValue}.*`, 'i');
        }
        if (templateIds) {
          selector._id = { $in: templateIds };
        }

        // return models.Templates.find({});
        return models.Templates.find(selector).sort({ order: 1, name: 1 });
      },

      templateTypes(_root, _args, { models }: IContext) {
        return models.Types.find({});
      },

      templatesTotalCount(_root, _args, { models }: IContext) {
        return models.Templates.find({}).countDocuments();
      }
    };

    export default templateQueries;
  ```

</details>

#### GraphQL typeDefs

Inside `/graphql/schema.ts` file contains GraphQL typeDefs schema. 

<details>
  <summary>Click to see schema:</summary>

  ```ts showLineNumbers 

    export const types = `
    type Template {
      _id: String!
      name: String
      createdAt:Date
      expiryDate:Date
      checked:Boolean
      typeId: String
    
      currentType: TemplateType
    }

    type TemplateType {
      _id: String!
      name: String
    }
  `;

  export const queries = `
    templates(typeId: String): [Template]
    templateTypes: [TemplateType]
    templatesTotalCount: Int
  `;

  const params = `
    name: String,
    expiryDate: Date,
    checked: Boolean,
    typeId:String
  `;

  export const mutations = `
    templatesAdd(${params}): Template
    templatesRemove(_id: String!): JSON
    templatesEdit(_id:String!, ${params}): Template
    templateTypesAdd(name:String):TemplateType
    templateTypesRemove(_id: String!):JSON
    templateTypesEdit(_id: String!, name:String): TemplateType
  `;
  ```
</details>

Inside `/graphql/typeDefs.ts` file contains GraphQL typeDefs. 

<details>
  <summary>Click to see typeDefs:</summary>

  ```ts showLineNumbers
    import { gql } from 'apollo-server-express';
    import { types, queries, mutations } from './schema';

    const typeDefs = async _serviceDiscovery => {
      return gql`
        scalar JSON
        scalar Date

        ${types}
        
        extend type Query {
          ${queries}
        }
        
        extend type Mutation {
          ${mutations}
        }
      `;
    };

    export default typeDefs;
  ```
</details>


### Database development

Inside `packages/plugin-<new_plugin>-api/src`, we have a <code>models</code> folder. The folder contains code related to MongoDB and mongoose.

```
 📂src
 ┣ 📂models
 ┃ ┣ 📂definitions
 ┃ ┃ ┣ [pluginName].ts
 ┃ ┃ ┗ utils.ts
 ┃ ┗ [pluginName].ts
```


#### Mongoose schema

Inside `models/definitions/[pluginName].ts`, file contains Mongoose schema codes.

<details>
  <summary>Click to see Mongoose schema example:</summary>

  ```ts showLineNumbers
    import { Document, Schema } from 'mongoose';

    // importing schema wrapper field function  
    import { field } from './utils';

    // typescript interface of a template
    export interface ITemplate {
      name: string;
      createdAt?: Date;
      expiryDate?: Date;
      checked: boolean;
      typeId: string;
    }

    // template document type
    export interface ITemplateDocument extends ITemplate, Document {
      _id: string;
    }

    // creating template schema
    export const templateSchema = new Schema({
      _id: field({ pkey: true }),
      name: field({ type: String, label: 'Name' }),
      createdAt: field({ type: Date, label: 'Created at' }),
      expiryDate: field({ type: Date, label: 'Expiry Date' }),
      checked: field({ type: Boolean, label: 'Checked', default: false }),
      typeId: field({ type: String, label: 'Type Id' })
    });

  ```
</details>

#### MongoDB model

Inside `models/[pluginName].ts`, file contains MongoDB model codes.

<details>
  <summary>Click to see Mongoose schema example:</summary>

  ```ts showLineNumbers
    import { Model } from 'mongoose';
    import * as _ from 'underscore';
    import { IModels } from '../connectionResolver';
    import {
      ITemplate,
      ITemplateDocument,
      templateSchema,
    } from './definitions/template';

    // declaring Template model's methods type
    export interface ITemplateModel extends Model<ITemplateDocument> {
      getTemplate(_id: string): Promise<ITemplateDocument>;
      createTemplate(doc: ITemplate): Promise<ITemplateDocument>;
      updateTemplate(_id: string, doc: ITemplate): Promise<ITemplateDocument>;
      removeTemplate(_id: string): void;
    }

    // loading Template model class
    export const loadTemplateClass = models => {
      class Template {
        public static async getTemplate(_id: string) {
          const webb = await models.Templates.findOne({ _id });

          if (!webb) {
            throw new Error('Webb not found');
          }

          return webb;
        }

        // create
        public static async createTemplate(doc: ITemplate) {
          return models.Templates.create({
            ...doc,
            createdAt: new Date()
          });
        }
        // update
        public static async updateTemplate(_id: string, doc: ITemplate) {
          await models.Templates.updateOne(
            { _id },
            { $set: { ...doc } }
          ).then(err => console.error(err));
        }
        // remove
        public static async removeTemplate(_id: string) {
          const webb = await models.Templates.getTemplate(_id);

          return models.Templates.deleteOne({ _id });
        }
      }

      templateSchema.loadClass(Template);

      return templateSchema;
    };
  ```
</details>

### Common functions

#### Message broker

The following <code>sendMessage</code> function used when work with the associated plugin.

`SendCommonMessage` function will send message to the other service with the following parameters:

<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>serviceName</code>
      </td>
      <td>
        Message receiving service name. <code>i.e. plugin name.</code>
      </td>
      <td>
        <code>String</code>
      </td>
    </tr>
    <tr>
      <td>
        <code>action</code>
      </td>
      <td>
        Action of the message.
      </td>
      <td>
        <code>String</code>
      </td>
    </tr>
    <tr>
      <td>
        <code>data</code>
      </td>
      <td>
        Passing data.
      </td>
      <td>
        <code>Object</code>
      </td>
    </tr>
    <tr>
      <td>
        <code>isRPC</code>
      </td>
      <td>
        Message type, if it's true message will return value.
      </td>
      <td>
        <code>Boolean</code>
      </td>
    </tr>
    <tr>
      <td>
        <code>timeout</code>
      </td>
      <td>
        The time limit for waiting for a response from a message.
      </td>
      <td>
        <code>Number</code>
      </td>
    </tr>
    <tr>
      <td>
        <code>defaultValue</code>
      </td>
      <td>
        Default return value if an error occurs while sending the message.
      </td>
      <td>
        <code>any</code>
      </td>
    </tr>
    <tr>
      <td>
        <code>client</code>
      </td>
      <td>
        ....
      </td>
      <td>
        <code>Object</code>
      </td>
    </tr>
    <tr>
      <td>
        <code>serviceDiscovery</code>
      </td>
      <td>
        Service discovery contains services information such as service isEnabled 
      </td>
      <td>
        <code>String</code>
      </td>
    </tr>
    <tr>
      <td>
        <code>subdomain</code>
      </td>
      <td>
        subdomain...
      </td>
      <td>
        <code>String</code>
      </td>
    </tr>
  </tbody>
</table>

```ts showLineNumbers
export const sendCommonMessage = async (
  args: ISendMessageArgs & { serviceName: string }
) => {
  return sendMessage({
    serviceDiscovery,
    client,
    ...args
  });
};

// We can pass default serviceName parameter and can be used by giving the name of the server.
export const sendCoreMessage = (args: ISendMessageArgs): Promise<any> => {
  return sendMessage({
    client,
    serviceDiscovery,
    serviceName: 'core',
    ...args
  });
};
```

Messagebroker contains two consumer functions `consumeQueue` & `consumeRPCQueue`. Difference between them is `consumeRPCQueue` returns a value, while `consumeQueue` doesn't.

`consumeQueue, consumeRPCQueue` function will receive message from the other service with the following parameters:

<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>name</code>
      </td>
      <td>
        The name of the message receiving queue. Name has the following format <code>serviceName:actionName</code>
      </td>
      <td>
        <code>String</code>
      </td>
    </tr>
    <tr>
      <td>
        <code>data</code>
      </td>
      <td>
        The data of the message being sent by the service.
      </td>
      <td>
        <code>String</code>
      </td>
    </tr>
    <tr>
      <td>
        <code>subdomain</code>
      </td>
      <td>
        ...
      </td>
      <td>
        <code>String</code>
      </td>
    </tr>
  </tbody>
</table>



## Plugin UI structure

After creating new plugin using `yarn-create-plugin` command, the following files are generated automatically in your new plugin ui. 

```
📦plugin-[pluginName]-ui
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┃ ┣ Form.tsx
 ┃ ┃ ┣ List.tsx
 ┃ ┃ ┣ Row.tsx
 ┃ ┃ ┣ SideBar.tsx
 ┃ ┃ ┗ TypeForm.tsx
 ┃ ┣ 📂containers
 ┃ ┃ ┣ List.tsx
 ┃ ┃ ┗ SideBarList.tsx
 ┃ ┣ 📂graphql
 ┃ ┃ ┣ index.ts
 ┃ ┃ ┣ mutations.ts
 ┃ ┃ ┗ queries.ts
 ┃ ┣ App.tsx
 ┃ ┣ configs.js
 ┃ ┣ generalRoutes.tsx
 ┃ ┣ index.js
 ┃ ┣ routes.tsx
 ┃ ┗ types.ts
 ┣ package.json
 ┗ yarn.lock
```

### Main files
Following files are generated automatically in `plugin-[pluginName]-ui/src`.

#### configs.js 
Following file contains 

```ts showLineNumbers
  // path: ./packages/plugin-[pluginName]-ui/src/configs.js 

  module.exports = {
    name: '[pluginName]',
    port: 3017,
    scope: '[pluginName]',
    exposes: {
      './routes': './src/routes.tsx'
    },
    routes: {
      url: 'http://localhost:3017/remoteEntry.js',
      scope: '[pluginName]',
      module: './routes'
    },
    menus:[{"text":"[pluginName]","url":"/[pluginUrl]","icon":"icon-star","location":"[mainNavigation or settings]"}]
  };
```

#### routes.tsx

Following file contains routes of components.

```ts showLineNumbers
  // path: ./packages/plugin-[pluginName]-ui/src/routes.tsx 

  import asyncComponent from '@erxes/ui/src/components/AsyncComponent';
  import queryString from 'query-string';
  import React from 'react';
  import { Route } from 'react-router-dom';

  const List = asyncComponent(() =>
    import(/* webpackChunkName: "List - Webbs" */ './containers/List')
  );

  const webbs = ({ location, history }) => {
    const queryParams = queryString.parse(location.search);
    const { type } = queryParams;

    return <List typeId={type} history={history} />;
  };

  const routes = () => {
    return <Route path="/webbs/" component={webbs} />;
  };

  export default routes;

```

#### App.tsx

This file is a main component. 

```ts showLineNumbers
  // path: ./packages/plugin-[pluginName]-ui/src/App.tsx 

  import React from 'react';
  import GeneralRoutes from './generalRoutes';
  import { PluginLayout } from '@erxes/ui/src/styles/main';
  import { AppProvider } from 'coreui/appContext';

  const App = () => {
    return (
      <AppProvider>
        <PluginLayout>
          <GeneralRoutes />
        </PluginLayout>
      </AppProvider>
    );
  };

  export default App;
```

#### App.tsx

This file contains `Typescript` types that used by your plugin.

```ts showLineNumbers
  // path: ./packages/plugin-[pluginName]-ui/src/types.ts 

  export interface ITemplate {
    _id: string;
    name?: string;
    createdAt?: Date;
    expiryDate?: Date;
    totalObjectCount?: number;
    checked?: boolean;
    typeId?: string;
    currentType?: IType;
  }

  export interface IType {
    _id: string;
    name: string;
  }

  // query types
  export type TemplateQueryResponse = {
    templates: ITemplate[];
    refetch: () => void;
    loading: boolean;
  };
  export type TypeQueryResponse = {
    templateTypes: IType[];
    refetch: () => void;
    loading: boolean;
  };

  // mutation types
  export type MutationVariables = {
    _id?: string;
    name: string;
    createdAt?: Date;
    expiryDate?: Date;
    checked?: boolean;
    type?: string;
  };

  export type AddMutationResponse = {
    addMutation: (params: { variables: MutationVariables }) => Promise<any>;
  };

  export type EditMutationResponse = {
    editMutation: (params: { variables: MutationVariables }) => Promise<any>;
  };

  export type RemoveMutationResponse = {
    removeMutation: (params: { variables: { _id: string } }) => Promise<any>;
  };

  export type EditTypeMutationResponse = {
    typesEdit: (params: { variables: MutationVariables }) => Promise<any>;
  };

  export type RemoveTypeMutationResponse = {
    typesRemove: (params: { variables: { _id: string } }) => Promise<any>;
  };

```


### UI development

#### Components

:::note

If you want to see Erxes `common components`, click the **<a href="https://docs.erxes.io/docs/components/AnimatedLoader">components</a>**.

:::

Inside `.src` folder, we have a components folder. The folder contains main components of plugin.

```
 📂src
 ┣ 📂components
 ┃ ┣ Form.tsx
 ┃ ┣ List.tsx
 ┃ ┣ Row.tsx
 ┃ ┣ SideBar.tsx
 ┃ ┗ TypeForm.tsx
```

<details>
  <summary>Click to see components example: </summary>

  ```ts showLineNumbers
    // path: ./packages/plugin-[pluginName]-ui/src/components/TypeForm.tsx 

    import { __ } from '@erxes/ui/src/utils/core';
    import React from 'react';
    import { IType } from '../types';
    import { IButtonMutateProps, IFormProps } from '@erxes/ui/src/types';
    import Form from '@erxes/ui/src/components/form/Form';
    import {
      ControlLabel,
      FormControl,
      FormGroup
    } from '@erxes/ui/src/components/form';
    import Button from '@erxes/ui/src/components/Button';
    import { ModalFooter } from '@erxes/ui/src/styles/main';

    type Props = {
      renderButton: (props: IButtonMutateProps) => JSX.Element;
      closeModal?: () => void;
      afterSave?: () => void;
      remove?: (type: IType) => void;
      types?: IType[];
      type: IType;
    };

    const TypeForm = (props: Props) => {
      const { type, closeModal, renderButton, afterSave } = props;

      const generateDoc = (values: {
        _id?: string;
        name: string;
        content: string;
      }) => {
        const finalValues = values;

        const { type } = props;

        if (type) {
          finalValues._id = type._id;
        }

        return {
          ...finalValues
        };
      };

      const renderContent = (formProps: IFormProps) => {
        const { values, isSubmitted } = formProps;

        const object = type || ({} as any);
        return (
          <>
            <FormGroup>
              <ControlLabel required={true}>Todo Type</ControlLabel>
              <FormControl
                {...formProps}
                name='name'
                defaultValue={object.name}
                type='text'
                required={true}
                autoFocus={true}
              />
            </FormGroup>
            <ModalFooter id={'AddTypeButtons'}>
              <Button btnStyle='simple' onClick={closeModal} icon='times-circle'>
                Cancel
              </Button>

              {renderButton({
                passedName: 'type',
                values: generateDoc(values),
                isSubmitted,
                callback: closeModal || afterSave,
                object: type
              })}
            </ModalFooter>
          </>
        );
      };

      return <Form renderContent={renderContent} />;
    };

    export default TypeForm;
  ```
</details>

#### Containers
Inside `.src` folder, we have a containers folder. The folder contains a component that contains codes related to GraphQL.

```
  📂src
  ┣ 📂containers
  ┃ ┣ List.tsx
  ┃ ┗ SideBarList.tsx
```

<details>
  <summary>Click to see containers example:</summary>

  ```ts showLineNumbers
    // path: ./packages/plugin-[pluginName]-ui/src/containers/SideBarList.tsx 

    import gql from 'graphql-tag';
    import * as compose from 'lodash.flowright';
    import { graphql } from 'react-apollo';
    import { Alert, confirm, withProps } from '@erxes/ui/src/utils';
    import SideBar from '../components/SideBar';
    import {
      EditTypeMutationResponse,
      RemoveTypeMutationResponse,
      TypeQueryResponse
    } from '../types';
    import { mutations, queries } from '../graphql';
    import React from 'react';
    import { IButtonMutateProps } from '@erxes/ui/src/types';
    import ButtonMutate from '@erxes/ui/src/components/ButtonMutate';
    import Spinner from '@erxes/ui/src/components/Spinner';

    type Props = {
      history: any;
      currentTypeId?: string;
    };

    type FinalProps = {
      listTemplateTypeQuery: TypeQueryResponse;
    } & Props &
      RemoveTypeMutationResponse &
      EditTypeMutationResponse;

    const TypesListContainer = (props: FinalProps) => {
      const { listTemplateTypeQuery, typesEdit, typesRemove, history } = props;

      if (listTemplateTypeQuery.loading) {
        return <Spinner />;
      }

      // calls gql mutation for edit/add type
      const renderButton = ({
        passedName,
        values,
        isSubmitted,
        callback,
        object
      }: IButtonMutateProps) => {
        return (
          <ButtonMutate
            mutation={object ? mutations.editType : mutations.addType}
            variables={values}
            callback={callback}
            isSubmitted={isSubmitted}
            type="submit"
            successMessage={`You successfully ${
              object ? 'updated' : 'added'
            } a ${passedName}`}
            refetchQueries={['listTemplateTypeQuery']}
          />
        );
      };

      const remove = type => {
        confirm('You are about to delete the item. Are you sure? ')
          .then(() => {
            typesRemove({ variables: { _id: type._id } })
              .then(() => {
                Alert.success('Successfully deleted an item');
              })
              .catch(e => Alert.error(e.message));
          })
          .catch(e => Alert.error(e.message));
      };

      const updatedProps = {
        ...props,
        types: listTemplateTypeQuery.templateTypes || [],
        loading: listTemplateTypeQuery.loading,
        remove,
        renderButton
      };

      return <SideBar {...updatedProps} />;
    };

    export default withProps<Props>(
      compose(
        graphql(gql(queries.listTemplateTypes), {
          name: 'listTemplateTypeQuery',
          options: () => ({
            fetchPolicy: 'network-only'
          })
        }),
        graphql(gql(mutations.removeType), {
          name: 'typesRemove',
          options: () => ({
            refetchQueries: ['listTemplateTypeQuery']
          })
        })
      )(TypesListContainer)
    );
  ```
</details>


#### GraphQL

Inside `.src` folder, we have a `graphql` folder. The folder contains code related to GraphQL.

```
 📂src
 ┣ 📂graphql
 ┃ ┣ index.ts
 ┃ ┣ mutations.ts
 ┃ ┗ queries.ts
```


Inside `/graphql/mutations.ts` GraphQL mutation codes. 

<details>
  <summary>Click to see GraphQL mutation examples: </summary>

  ```ts showLineNumbers
    const add = `
      mutation templatesAdd($name: String!, $expiryDate: Date, $typeId:String) {
        templatesAdd(name:$name, expiryDate: $expiryDate, typeId:$typeId) {
          name
          _id
          expiryDate
          typeId
        }
      }
    `;

    const remove = `
      mutation templatesRemove($_id: String!){
        templatesRemove(_id: $_id)
      }
      `;

    const edit = `
      mutation templatesEdit($_id: String!, $name:String, $expiryDate:Date, $checked:Boolean, $typeId:String){
        templatesEdit(_id: $_id, name: $name, expiryDate:$expiryDate, checked:$checked, typeId:$typeId){
          _id
        }
      }
      `;

    const addType = `
      mutation typesAdd($name: String!){
        templateTypesAdd(name:$name){
          name
          _id
        }
      }
      `;

    const removeType = `
      mutation typesRemove($_id:String!){
        templateTypesRemove(_id:$_id)
      }
    `;

    const editType = `
      mutation typesEdit($_id: String!, $name:String){
        templateTypesEdit(_id: $_id, name: $name){
          _id
        }
      }
    `;

    export default {
      add,
      remove,
      edit,
      addType,
      removeType,
      editType
    };
  ```


</details>


Inside `/graphql/queries.ts` GraphQL query codes. 

<details>
  <summary>Click to see GraphQL query examples: </summary>

  ```ts showLineNumbers
  const list = `
    query listQuery($typeId: String) {
      webbs(typeId: $typeId) {
        _id
        name
        expiryDate
        createdAt
        checked
        typeId
        currentType{
          _id
          name
        }
      }
    }
  `;

  const listWebbTypes = `
    query listWebbTypeQuery{
      webbTypes{
        _id
        name
      }
    }
  `;

  const totalCount = `
    query webbsTotalCount{
      webbsTotalCount
    }
  `;

  export default {
    list,
    totalCount,
    listWebbTypes
  };
  ```
</details>