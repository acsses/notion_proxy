const express = require('express')
const { Client } = require("@notionhq/client")
const notion = new Client({auth: 'secret_voHoNdOnBI9Cc3dfRsrLwDzTm3yLygIV8bjfYUrasRs'});

const app = express()


app.get('/database/', async (req, res) => {
  const data = await notion.databases.query({
    database_id: "08c5dea32e0b4f468a98bd419bc54aaa",
  })
  res.status(200).json(data);
}
)

app.get('/page/content/:id', async (req, res) => {
        const data = await notion.blocks.children.list({
            block_id: req.params.id,
        })
        res.status(200).json(data);
    }
)
app.get('/page/property/:id', async (req, res) => {
        const data = await notion.pages.retrieve({
            page_id: req.params.id,
        })
        res.status(200).json(data);
    }
)
app.get('/serch/:word', async (req, res) => {
    const data = await notion.databases.query({
      database_id: "08c5dea32e0b4f468a98bd419bc54aaa",
      filter: {
        property: "Tag",
        multi_select: {
          contains: req.params.word,
        },
      },
    })
    res.status(200).json(data);
}
)
app.listen({ port: 3000 }, () => {
  console.log(`Server ready at http://localhost:3000`);
});

module.exports=app