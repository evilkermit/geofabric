project(rasterize)

# Ospray Tutorial
add_executable(ospTutorial ospTutorial.cpp)
target_link_libraries(ospTutorial
	PUBLIC ospray

	)

# main example
add_executable(main main.cpp)
target_link_libraries(main 
	PRIVATE 
	simplecmake)
