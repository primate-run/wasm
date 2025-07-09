import * as phpnode from "@php-wasm/node";
import * as php from "@php-wasm/universal";
import FileRef from "@rcompat/fs/FileRef";

const instance = new php.PHP(await phpnode.loadNodeRuntime("8.3"));

instance.writeFile(
  "./primate.php",
  await new FileRef("./primate.php").text()
);

instance.onMessage((data) => {
  console.log(JSON.parse(data));
})

const stream = await instance.runStream({
  method: "GET",
  headers: {
    "Content-Type": "text/plain",
    "Custom-Header": "Custom-Value",
  },
  body: "Hello world!",
  code: await new FileRef("./index.php").text(),
});
