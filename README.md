# Contribution Guide

Thank you for your interest in contributing to this project! Follow these steps to make the process smooth:

## Code of Conduct

This project follows a [Code of Conduct](./CODE_OF_CONDUCT.md). Please try to it and report any issues to [ally.rippley@gmail.com].

## How to Contribute

1. **Fork the Repository**: Use the "Fork" button and clone your fork locally.
2. **Create a Branch**: Create a branch for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make Changes**: Implement your feature or fix.
4. **Test Your Changes**: Ensure all tests pass:
   ```bash
   yarn install
   yarn test
   ```
5. **Commit and Push**: Commit with a descriptive message:
   ```bash
   git add .
   git commit -m "feat: Add your feature"
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request**: Go to the main repository and open a pull request.

## Reporting Issues

If you find a bug or have a feature request, [open an issue](./issues). Provide details like:

- Steps to reproduce
- Expected and actual behavior
- Screenshots or error logs

## Development Guidelines

- **Branch Naming**: Please follow existing branch name conventions (e.g., `feature/feature-name`, `fix/bug-name`).
- (not currently applicable) **Testing**: Write tests for all new features or fixes.
- **Linting**: Run lint checks before committing:
  ```bash
  yarn lint
  ```
- **Documentation**: Update documentation for new features.

## Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) style:

- `feat: Add user authentication`
- `fix: Resolve API timeout issue`
- `docs: Update README`
- `chore: Update dependencies`

## Resources

- [Issues](./issues)
- [Discussions](./discussions)
- Contact: [ally.rippley@gmail.com]
