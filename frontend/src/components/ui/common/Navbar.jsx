"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { CircleUserRound, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const Navbar = () => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const token = JSON.parse(localStorage.getItem("token"))

  const handleProfileNavigation = () => {
    if (JSON.parse(localStorage.getItem("user"))?.role === "agent") {
      navigate("/agent-profile")
    } else {
      navigate("/profile")
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="sticky top-0 w-full z-50 shadow-lg py-2 px-4 bg-white">
      <div className="flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => navigate("/")}
          className="text-xl font-bold text-brand cursor-pointer flex items-center gap-2"
        >
          PropertyYatra
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <Button variant="ghost" onClick={() => navigate("/property-listing")}>
            For Buyers
          </Button>
          <Button variant="ghost" onClick={() => navigate("/property-listing")}>
            For Tenants
          </Button>
          <Button variant="ghost" onClick={() => navigate("/property-listing")}>
            For Agents/Builders
          </Button>
          <Button variant="ghost" onClick={() => navigate("/comingsoon")}>
            Invest Now
          </Button>

          {/* Services Dropdown */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="inline-flex items-center">
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="flex flex-col space-y-1">
                <Button variant="ghost" className="justify-start" onClick={() => navigate("/facilities")}>
                  Facility Management
                </Button>
                <Button variant="ghost" className="justify-start" onClick={() => navigate("/comingsoon")}>
                  Legal Services
                </Button>
                <Button variant="ghost" className="justify-start" onClick={() => navigate("/comingsoon")}>
                  Home Loan
                </Button>
                <Button variant="ghost" className="justify-start" onClick={() => navigate("/tools")}>
                  Tools
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Button className="cursor-pointer" onClick={() => navigate("/add")}>
            Post a Property <span className="bg-green-400 rounded-md px-1 ml-1">Free</span>
          </Button>
          {!token ? (
            <Button className="cursor-pointer bg-brand" onClick={() => navigate("/auth")}>
              Login / Register
            </Button>
          ) : (
            <CircleUserRound size={30} onClick={handleProfileNavigation} className="cursor-pointer" />
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={toggleMobileMenu} className="p-1">
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2">
          <div className="flex flex-col space-y-2">
            <Button variant="ghost" onClick={() => navigate("/property-listing")}>
              For Buyers
            </Button>
            <Button variant="ghost" onClick={() => navigate("/property-listing")}>
              For Tenants
            </Button>
            <Button variant="ghost" onClick={() => navigate("/property-listing")}>
              For Agents/Builders
            </Button>
            <Button variant="ghost" onClick={() => navigate("/comingsoon")}>
              Invest Now
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="justify-start">
                  Services
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <div className="flex flex-col space-y-1">
                  <Button variant="ghost" className="justify-start" onClick={() => navigate("/facilities")}>
                    Facility Management
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={() => navigate("/comingsoon")}>
                    Legal Services
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={() => navigate("/comingsoon")}>
                    Home Loan
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={() => navigate("/comingsoon")}>
                    Tools
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Button onClick={() => navigate("/add")}>
              Post a Property <span className="bg-green-400 rounded-md px-1 ml-1">Free</span>
            </Button>
            {!token ? (
              <Button onClick={() => navigate("/auth")}>Login / Register</Button>
            ) : (
              <Button variant="ghost" onClick={handleProfileNavigation} className="justify-start">
                <CircleUserRound className="mr-2 h-4 w-4" />
                Profile
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
