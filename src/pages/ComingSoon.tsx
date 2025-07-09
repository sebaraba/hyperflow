import { Container, Stack, Title, Text, Image } from '@mantine/core';

export const ComingSoon = () => {
  return (
    <Container size="md" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Stack align="center" gap="lg">
        <Title order={1}>Coming Soon!</Title>
        <Text size="lg" color="dimmed">
          We're working hard to bring this feature to you. Stay tuned!
        </Text>
        <Image
          src="https://media.giphy.com/media/3o7abldj0b3rxrZUxW/giphy.gif"
          alt="Funny Coming Soon GIF"
          width={400}
        />
      </Stack>
    </Container>
  );
};
