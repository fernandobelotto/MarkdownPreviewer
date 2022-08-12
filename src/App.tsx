import {
  Box,
  Button,
  Center, Heading,
  HStack,
  Text,
  Textarea,
  useClipboard,
  VStack
} from "@chakra-ui/react";
import { marked } from "marked";
import { useEffect, useState } from "react";

export default function App() {
  const [markdownValue, setMarkdownValue] = useState<string | null>("");


  const storageKey = "text";

  useEffect(() => {
    if (markdownValue) {
      localStorage.setItem(storageKey, markdownValue);
    }
  }, [markdownValue]);

  useEffect(() => {
    console.log("localStorage.getItem(", localStorage.getItem(storageKey));
    if (localStorage.getItem(storageKey)) {
      setMarkdownValue(localStorage.getItem(storageKey));
    }
  }, []);

  const generatedHtml = marked.parse(markdownValue);
  const { hasCopied, onCopy } = useClipboard(generatedHtml);

  // TODO: check corner cases!

  return (
    <>
      <Center h="100vh">
        <Box>
          <VStack
            spacing={3}
            p={5}
            borderRadius={10}
          >
            <Heading>Markdown Previewer!</Heading>

            <HStack spacing={10}>
              <VStack>
                <Textarea
                  size="sm"
                  borderRadius={4}
                  value={markdownValue ?? ""}
                  onChange={(e) => setMarkdownValue(e.target.value)}
                  placeholder="Enter a paragraph of text"
                  rows={20}
                />
                <Button onClick={onCopy} ml={2}>
                  {hasCopied ? "Html Copied" : "Copy Html"}
                </Button>
              </VStack>

              <Box>
                <Box m={4} p={4} bg="gray.100" borderRadius="md" w="100%">
                  <div dangerouslySetInnerHTML={{ __html: generatedHtml }} />
                </Box>

                <Box m={4} p={4} bg="gray.100" borderRadius="md" w="100%">
                  <Text w="300px">{generatedHtml}</Text>
                </Box>
              </Box>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </>
  );
}
