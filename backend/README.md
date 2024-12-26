# Backend Project Setup Instructions

Follow the steps below to set up the virtual environment and install dependencies for the project.

## Prerequisites

- **Python 3.8+** installed on your machine
- **pip** (Python package installer)
- **git** (if you haven't already cloned the repository)

## Steps to Set Up the Development Environment

### 1. Clone the Repository

If you haven’t cloned the repository yet, run:

"""
    git clone https://github.com/Samue1eun/RedzoneGetaway.git

"""

### 2. Create a Virtual Environment

With the repository cloned, make sure to run "deactivate" if you have any active virtual environment and run the following command to create the virtual environment.

#### For macOS/Linux
"""
    python3 -m venv <venv_name>
"""

#### For Windows
"""
    python -m venv <venv_name>
"""

This will create the new venv directory in the project folder. 

### 3. Create a .gitignore File

Now before making a single commit, run the following command to make a .gitignore file to your directory.

"""
    touch .gitignore
"""

Open the .gitignore file and add the following:

"""
    # Ignore the virtual environment directory
    venv/

    # Ignore Python cache files
    __pycache__/
    *.pyc
"""



Getting started with this project, first-things-first make a ".gitignore" file and copy and paste the following code block.

"""

    # Ignore the virtual environment directory
    <venv_name>/

    # Ignore Python cache files
    __pycache__/
    *.pyc

"""

This will ensure you are not uploading any unwanted files. 

### 4. Activate the Virtual Environment

#### For macOS/Linux

"""
    source <venv_name>/bin/activate
"""

#### For Windows (Command Prompt)
"""
    .\<venv_name>\Scripts\activate
"""

#### For Windows (PowerShell)
"""
    .\<venv_name>\Scripts\Activate.ps1
"""

Verify that the virtual environment has been activated. You should see (<venv_name>) appear in your terminal, indicating that the virtual environment is active. 

### 5. Install Dependencies

Now that your virtual environment is active, install the required dependencies using pip

"""
    pip install -r requirements.txt
"""

This will install all the packages listed in requirements.txt.

### 6. Verify Installation 

To verify that the packages were installed correctly, you can run:

"""
    pip list
"""

This will show a list of the installed packages in your virtual environment. If everything is successful then your good to start working, ensure that every time you make a pull request you redo steps 5 and 6 to ensure that you are up-to-date on all the current working dependencies for the project.

## Additional Notes

### When you install a new dependencies

Activating the virtual environment: Remember to activate the virtual environment every time you start working on the project.

Updating dependencies: If you add new dependencies or update existing ones, make sure to update the requirements.txt file by running:

"""
    pip freeze > requirements.txt
"""

HAPPY CODING!!!