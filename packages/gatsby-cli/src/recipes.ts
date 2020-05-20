import { trackCli } from "gatsby-telemetry"
// NOTE(@mxstbr): I explicitly import from /index because the file used to live at graphql.js, which means developers with old builds on their local machines will have that old version imported instead of the new one with changes
import startGraphQLServer from "gatsby-recipes/dist/graphql-server"

export async function recipesHandler(
  projectRoot: string,
  recipe: string | undefined
): Promise<void> {
  trackCli(`RECIPE_RUN`, { name: recipe })

  const graphql = await startGraphQLServer(projectRoot)

  const runRecipe = require(`gatsby-recipes/dist/index.js`)
  return runRecipe({
    recipe,
    graphqlPort: graphql.port,
    projectRoot,
  })
}
