project(rasterize)

add_library(simplecmake SHARED printhello.cpp)

target_include_directories(
	simplecmake
	PUBLIC
	${CMAKE_CURRENT_SOURCE_DIR}/../include)


