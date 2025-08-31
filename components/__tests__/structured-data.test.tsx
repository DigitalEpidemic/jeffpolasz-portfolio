import { render } from '@testing-library/react';
import {
  PersonStructuredData,
  ProjectStructuredData,
  WebsiteStructuredData,
} from '../structured-data';

// Mock Next.js Script component
jest.mock('next/script', () => {
  return function MockScript({
    children,
    dangerouslySetInnerHTML,
    id,
    type,
    ...props
  }: any) {
    return (
      <script
        id={id}
        type={type}
        data-testid={id}
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
        {...props}
      />
    );
  };
});

describe('Structured Data Components', () => {
  describe('PersonStructuredData', () => {
    const mockPersonProps = {
      name: 'John Doe',
      jobTitle: 'Software Developer',
      description: 'Experienced full-stack developer',
      url: 'https://johndoe.dev',
      email: 'john@example.com',
      github: 'https://github.com/johndoe',
      skills: ['JavaScript', 'React', 'Node.js'],
    };

    it('renders person structured data with all props', () => {
      const { container } = render(
        <PersonStructuredData {...mockPersonProps} />
      );

      const script = container.querySelector(
        '[data-testid="person-structured-data"]'
      );
      expect(script).toBeInTheDocument();
      expect(script).toHaveAttribute('type', 'application/ld+json');

      const scriptContent = script?.innerHTML;
      const structuredData = JSON.parse(scriptContent || '{}');

      expect(structuredData).toMatchObject({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'John Doe',
        jobTitle: 'Software Developer',
        description: 'Experienced full-stack developer',
        url: 'https://johndoe.dev',
        email: 'john@example.com',
        sameAs: ['https://github.com/johndoe'],
        knowsAbout: ['JavaScript', 'React', 'Node.js'],
        workLocation: {
          '@type': 'Place',
          name: 'Waterloo, Ontario, Canada',
        },
      });
    });

    it('renders person structured data without optional props', () => {
      const minimalProps = {
        name: 'Jane Smith',
        jobTitle: 'Designer',
        description: 'Creative designer',
        url: 'https://janesmith.design',
        email: 'jane@example.com',
      };

      const { container } = render(<PersonStructuredData {...minimalProps} />);

      const script = container.querySelector(
        '[data-testid="person-structured-data"]'
      );
      const scriptContent = script?.innerHTML;
      const structuredData = JSON.parse(scriptContent || '{}');

      expect(structuredData.sameAs).toEqual([]);
      expect(structuredData.knowsAbout).toEqual([]);
      expect(structuredData.name).toBe('Jane Smith');
    });

    it('handles empty skills array as default', () => {
      const propsWithoutSkills = {
        name: 'Bob Wilson',
        jobTitle: 'Manager',
        description: 'Team manager',
        url: 'https://bobwilson.com',
        email: 'bob@example.com',
        github: 'https://github.com/bobwilson',
      };

      const { container } = render(
        <PersonStructuredData {...propsWithoutSkills} />
      );

      const script = container.querySelector(
        '[data-testid="person-structured-data"]'
      );
      const scriptContent = script?.innerHTML;
      const structuredData = JSON.parse(scriptContent || '{}');

      expect(structuredData.knowsAbout).toEqual([]);
    });
  });

  describe('ProjectStructuredData', () => {
    const mockProjectProps = {
      name: 'Awesome Project',
      description: 'An amazing web application',
      url: 'https://awesome-project.com',
      author: 'John Doe',
      dateCreated: '2023-01-01',
      programmingLanguage: ['TypeScript', 'React'],
      github: 'https://github.com/johndoe/awesome-project',
      image: 'https://awesome-project.com/image.png',
    };

    it('renders project structured data with all props', () => {
      const { container } = render(
        <ProjectStructuredData {...mockProjectProps} />
      );

      const script = container.querySelector(
        '[data-testid="project-structured-data-awesome-project"]'
      );
      expect(script).toBeInTheDocument();
      expect(script).toHaveAttribute('type', 'application/ld+json');

      const scriptContent = script?.innerHTML;
      const structuredData = JSON.parse(scriptContent || '{}');

      expect(structuredData).toMatchObject({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Awesome Project',
        description: 'An amazing web application',
        url: 'https://awesome-project.com',
        author: {
          '@type': 'Person',
          name: 'John Doe',
        },
        dateCreated: '2023-01-01',
        programmingLanguage: ['TypeScript', 'React'],
        codeRepository: 'https://github.com/johndoe/awesome-project',
        image: 'https://awesome-project.com/image.png',
        applicationCategory: 'DeveloperApplication',
      });
    });

    it('renders project structured data with minimal props', () => {
      const minimalProps = {
        name: 'Simple App',
        description: 'A simple application',
        author: 'Jane Smith',
        dateCreated: '2023-06-01',
      };

      const { container } = render(<ProjectStructuredData {...minimalProps} />);

      const script = container.querySelector(
        '[data-testid="project-structured-data-simple-app"]'
      );
      const scriptContent = script?.innerHTML;
      const structuredData = JSON.parse(scriptContent || '{}');

      expect(structuredData.programmingLanguage).toEqual([]);
      expect(structuredData.url).toBeUndefined();
      expect(structuredData.codeRepository).toBeUndefined();
      expect(structuredData.image).toBeUndefined();
    });

    it('generates correct ID from project name', () => {
      const propsWithSpaces = {
        name: 'My Awesome Project Name',
        description: 'Test project',
        author: 'Test Author',
        dateCreated: '2023-01-01',
      };

      const { container } = render(
        <ProjectStructuredData {...propsWithSpaces} />
      );

      const script = container.querySelector(
        '[data-testid="project-structured-data-my-awesome-project-name"]'
      );
      expect(script).toBeInTheDocument();
    });

    it('handles empty programmingLanguage array as default', () => {
      const propsWithoutLang = {
        name: 'No Lang Project',
        description: 'Project without languages',
        author: 'Author',
        dateCreated: '2023-01-01',
      };

      const { container } = render(
        <ProjectStructuredData {...propsWithoutLang} />
      );

      const script = container.querySelector(
        '[data-testid="project-structured-data-no-lang-project"]'
      );
      const scriptContent = script?.innerHTML;
      const structuredData = JSON.parse(scriptContent || '{}');

      expect(structuredData.programmingLanguage).toEqual([]);
    });
  });

  describe('WebsiteStructuredData', () => {
    const mockWebsiteProps = {
      name: 'My Portfolio',
      description: 'Personal portfolio website',
      url: 'https://myportfolio.com',
      author: 'John Doe',
    };

    it('renders website structured data correctly', () => {
      const { container } = render(
        <WebsiteStructuredData {...mockWebsiteProps} />
      );

      const script = container.querySelector(
        '[data-testid="website-structured-data"]'
      );
      expect(script).toBeInTheDocument();
      expect(script).toHaveAttribute('type', 'application/ld+json');

      const scriptContent = script?.innerHTML;
      const structuredData = JSON.parse(scriptContent || '{}');

      expect(structuredData).toMatchObject({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'My Portfolio',
        description: 'Personal portfolio website',
        url: 'https://myportfolio.com',
        author: {
          '@type': 'Person',
          name: 'John Doe',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://myportfolio.com/?filter={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      });
    });

    it('generates correct search URL template', () => {
      const propsWithDifferentUrl = {
        name: 'Test Site',
        description: 'Test website',
        url: 'https://testsite.dev',
        author: 'Test Author',
      };

      const { container } = render(
        <WebsiteStructuredData {...propsWithDifferentUrl} />
      );

      const script = container.querySelector(
        '[data-testid="website-structured-data"]'
      );
      const scriptContent = script?.innerHTML;
      const structuredData = JSON.parse(scriptContent || '{}');

      expect(structuredData.potentialAction.target.urlTemplate).toBe(
        'https://testsite.dev/?filter={search_term_string}'
      );
    });
  });

  describe('JSON-LD Validation', () => {
    it('generates valid JSON-LD for all components', () => {
      const personProps = {
        name: 'Test Person',
        jobTitle: 'Developer',
        description: 'Test description',
        url: 'https://test.com',
        email: 'test@example.com',
      };

      const projectProps = {
        name: 'Test Project',
        description: 'Test project description',
        author: 'Test Author',
        dateCreated: '2023-01-01',
      };

      const websiteProps = {
        name: 'Test Website',
        description: 'Test website description',
        url: 'https://testwebsite.com',
        author: 'Test Author',
      };

      // Test that all components generate valid JSON
      expect(() => {
        render(<PersonStructuredData {...personProps} />);
        render(<ProjectStructuredData {...projectProps} />);
        render(<WebsiteStructuredData {...websiteProps} />);
      }).not.toThrow();
    });
  });
});
