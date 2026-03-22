import chefClaudeLogo from "../images/chef-claude-icon.png"

export default function Header() {
    return (
        <header>
            <img src={chefClaudeLogo} />
            <div>
                <h1>Chef Claude</h1>
                <p>AI-powered recipes from your pantry ingredients.</p>
            </div>
        </header>
    )
}