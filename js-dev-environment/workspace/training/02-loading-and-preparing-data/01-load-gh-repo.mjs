import { GithubRepoLoader } from "langchain/document_loaders/web/github"
// Peer dependency, used to support .gitignore syntax
import ignore from "ignore"

// Will not include anything under "ignorePaths"
const loader = new GithubRepoLoader(
    "https://github.com/bots-garden/simplism",
    { recursive: false, ignorePaths: [".gitpod.yml", ".goreleaser.yaml"] }
)

const docs = await loader.load()

console.log(docs.slice(0, 3))